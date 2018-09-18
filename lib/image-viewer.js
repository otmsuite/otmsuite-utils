const SelectListView = require('atom-select-list');
const atomClasses = require("atom");

module.exports = class ImageViewer {

  constructor () {
		this.element = document.createElement('div');
		var filePaths = this.getImageFilesPaths('/images');
		this.selectListView = new SelectListView({
		  items: filePaths,
		  elementForItem: (item, options) => {
		    const li = document.createElement('li');
				var html = '';
				if (options.visible) {
					html = '<div class = \"otmsuite-utils image-icon\">';
					html += '<img src=\"'+item.replace(/\\/g, '/')+'\"/>';
					html += '</div>'+item.replace(/\\/g, '/').split('/').pop();
					li.innerHTML = html
				}
				li.classList.add('otmsuite-utils', 'image-viewer');
		    return li;
		  },
			initiallyVisibleItemCount: 32,
		  didConfirmSelection: (item) => {
				this.returnCustomPath(item.replace(/\\/g, '/'));
				this.hide();
		  },
		  didCancelSelection: () => {
				this.hide();
		  }
		});
		this.element.append(this.selectListView.element);
  }

	getImageFilesPaths (relPath){
		var Directory = atomClasses.Directory;
		var dir = new Directory(atom.config.get('otmsuite-utils.otmtechDir')+relPath);
		var entries = dir.getEntriesSync();
		var files = [];
		for (let item of entries) {
			if (item.isDirectory()) {
				for (let item2 of this.getImageFilesPaths(relPath+'/'+item.getBaseName())){
					files.push(item2);
				}
			}else{
				var itemPath = item.getRealPathSync();
				if (itemPath.split('.').pop().toLowerCase() == 'svg'
						|| itemPath.split('.').pop().toLowerCase() == 'png'
						|| itemPath.split('.').pop().toLowerCase() == 'gif' ) {
					files.push(itemPath);
				}
			}
		}
		return files;
	}

	returnCustomPath (item){
		var customPath = item.replace('Otimiza/SVG/fontawesome', '%SVGF');
    customPath = customPath.replace('Otimiza/SVG/Letras', '%SVGL').replace('Otimiza/SVG/System', '%SVGS');
		customPath = customPath.replace('Otimiza/SVG/ionicons', '%SVGI').replace('Otimiza/SVG/Padrao', '%SVGP');
		customPath = customPath.replace('Cliente/SVG','%SVGC').replace('Otimiza/SVG/Diversos', '%SVGD');
		customPath = customPath.replace('Cliente','%C').replace('Otimiza/Diversos', '%D');
		customPath = customPath.replace('Otimiza/Letras', '%L').replace('Otimiza/System', '%S');
		customPath = customPath.replace('Otimiza/Padrao', '%P');
		customPath = '%'+customPath.split('%').pop().replace(/\\/g, '/');
		customPath = customPath.substring(0, customPath.toLowerCase().lastIndexOf('.'));
		const editor = atom.workspace.getActiveTextEditor();
		editor.insertText(customPath);

		var bufferPointsMultiple = editor.getCursorBufferPositions();
		var cursorRanges = [];

		for (var i = 0; i < bufferPointsMultiple.length; i++){
      var pointTo = bufferPointsMultiple[i].serialize();
      var row = pointTo[0];
      var col = pointTo[1];
			//Adicina o que foi inserido neste ponto para os intervalos a selecionar
			cursorRanges.push([[row,col-customPath.length],[row, col]]);
    }

		editor.setSelectedBufferRanges(cursorRanges);
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
