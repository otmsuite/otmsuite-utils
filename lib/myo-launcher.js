const SelectListView = require('atom-select-list');
const atomClasses = require("atom");
const homedir = require('os').homedir();
const otmtechPath = atom.config.get('otmsuite-utils.otmtechDir');
const optionsPath = otmtechPath+'/options';

module.exports = class MyoLauncher {

  constructor () {
		this.element = document.createElement('div');
		var myos = this.getMyoNames();
    myos.unshift('Menu de Menus');
		this.selectListView = new SelectListView({
		  items: myos,
		  elementForItem: (item, options) => {
		    const li = document.createElement('li');
				if (options.visible) {
					li.innerHTML = item
				}
		    return li;
		  },
			initiallyVisibleItemCount: 10,
		  didConfirmSelection: (item) => {
				this.callMenu(item);
				this.hide();
		  },
		  didCancelSelection: () => {
				this.hide();
		  }
		});
		this.element.append(this.selectListView.element);
  }

	getMyoNames (){
		var Directory = atomClasses.Directory;
		var dir = new Directory(optionsPath);
		var entries = dir.getEntriesSync();
		var files = [];
		for (let item of entries) {
			if (!item.isDirectory()) {
        var fileInfo = item.getBaseName();
				if (fileInfo.split('.').pop().toLowerCase() == 'myo' ) {
          const myo = fileInfo.substring(0, fileInfo.toLowerCase().lastIndexOf('.'));
					files.push(myo);
				}
			}
		}
		return files;
	}

	callMenu (item) {
		var customPath = otmtechPath+'/menu.exe';
    var spawn = require('child_process').spawn;
    if (item == 'Menu de Menus') {
      item = '';
    }
    var prc = spawn(customPath,  [item]);

    //noinspection JSUnresolvedFunction
    prc.stdout.setEncoding('utf8');
    prc.stdout.on('data', function (data) {
        var str = data.toString()
        var lines = str.split(/(\r?\n)/g);
        console.log(lines.join(""));
    });

    prc.on('close', function (code) {
        console.log('process exit code ' + code);
    });
	}

	async destroy () {
    await this.selectListView.destroy();
		this.panel.destroy();
		this.panel = null;
	}

	hide () {
    if (this.panel != null) {
			this.panel.hide();
    }
		atom.workspace.getActiveTextEditor().element.focus();
  }

	show() {
		if (!this.panel) {
      this.panel = atom.workspace.addModalPanel({item: this.element})
		}

		this.panel.show();
		this.selectListView.focus();
	}
};
