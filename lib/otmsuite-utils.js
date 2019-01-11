const ImageViewer = require('./image-viewer');

var CompositeDisposable;
var toolBar;

let imageViewer = null;

module.exports={
  subscription: null,
  view: null,

  activate: function(state) {
		var apd = require("atom-package-deps");
		apd.install("otmsuite-utils");
    var atomClasses=require("atom");
    CompositeDisposable=atomClasses.CompositeDisposable;
    this.subscription=new CompositeDisposable();

		this.subscription.add(atom.commands.add('atom-workspace', {
      'otmsuite-utils:themes-toggle': function(event) {
        var themes = atom.themes.getActiveThemeNames();
        if (themes.join(':').indexOf('light') == -1) {
					atom.config.set('core.themes', ["otmsuite-syntax-light","one-light-ui"]);
        }else {
					atom.config.set('core.themes', ["otmsuite-syntax-dark","one-dark-ui"]);
        }
      }
    }));
		this.subscription.add(
			atom.commands.add('atom-workspace', {
      'otmsuite-utils:toggle-image-viewer': function(event) {
				if (this.imageViewer) {
					if (this.imageViewer.panel.visible) {
						this.imageViewer.hide();
					}else{
						this.imageViewer.show();
					}
				} else {
					this.imageViewer = new ImageViewer();
					this.imageViewer.show();
				}
      }
    }));

    this.subscription.add(atom.commands.add('atom-text-editor', {
      'otmsuite-utils:insert-bs': function() {
        var editor;
        editor = this.getModel();
        return editor.insertText('');
      }
    }));
    this.subscription.add(atom.commands.add('atom-text-editor', {
      'otmsuite-utils:insert-bel': function(event) {
        var editor;
        editor = this.getModel();
        return editor.insertText('');
      }
    }));
    this.subscription.add(atom.commands.add('atom-text-editor', {
      'otmsuite-utils:insert-vt': function(event) {
        var editor;
        editor = this.getModel();
        return editor.insertText('');
      }
    }));
    this.subscription.add(atom.commands.add('atom-text-editor', {
      'otmsuite-utils:insert-enq': function(event) {
        var editor;
        editor = this.getModel();
        return editor.insertText('');
      }
    }));
    this.subscription.add(atom.commands.add('atom-text-editor', {
      'otmsuite-utils:insert-etx': function(event) {
        var editor;
        editor = this.getModel();
        return editor.insertText('');
      }
    }));
    this.subscription.add(atom.commands.add('atom-text-editor', {
      'otmsuite-utils:insert-eot': function(event) {
        var editor;
        editor = this.getModel();
        return editor.insertText('');
      }
    }));
    var _TriggerKey, _command, _commands, _keymap, _linuxSelector, _macSelector, _triggerKey, _windowsSelector;
    this.view = (require('./ColorPicker-view'))();
    _command = 'otmsuite-utils:openColorPicker';
    _triggerKey = (atom.config.get('otmsuite-utils.triggerKey')).toLowerCase();
    _TriggerKey = _triggerKey.toUpperCase();
    _macSelector = '.platform-darwin atom-workspace';
    _windowsSelector = '.platform-win32 atom-workspace';
    _linuxSelector = '.platform-linux atom-workspace';
    _keymap = {};
    _keymap["" + _macSelector] = {};
    _keymap["" + _macSelector]["cmd-" + _TriggerKey] = _command;
    _keymap["" + _windowsSelector] = {};
    _keymap["" + _windowsSelector]["ctrl-alt-" + _triggerKey] = _command;
    _keymap["" + _linuxSelector] = {};
    _keymap["" + _linuxSelector]["ctrl-alt-" + _triggerKey] = _command;
    atom.keymaps.add('otmsuite-utils:triggerColorPicker', _keymap);
    atom.contextMenu.add({
      'atom-text-editor': [
        {
          label: 'Color Picker',
          command: _command
        }
      ]
    });
    _commands = {};
    _commands["" + _command] = (function(_this) {
      return function() {
        var _ref;
        if (!((_ref = _this.view) != null ? _ref.canOpen : void 0)) {
          return;
        }
        return _this.view.open();
      };
    })(this);
    atom.commands.add('atom-text-editor', _commands);
    return this.view.activate();
  },

	consumeToolBar: function(getToolBar){
		toolBar = getToolBar('otmsuite-utils');

		toolBar.addButton({
			icon: 'plus-round',
      callback: 'application:new-file',
      tooltip: 'Novo Arquivo',
			iconset: 'ion'
		});

		toolBar.addButton({
			icon: 'document-text',
      callback: 'application:open-file',
      tooltip: 'Abrir Arquivo',
			iconset: 'ion'
		});

		toolBar.addButton({
			icon: 'folder',
      callback: 'application:open-folder',
      tooltip: 'Abrir Pasta',
			iconset: 'ion'
		});

		toolBar.addButton({
			icon: 'save',
      callback: 'core:save',
      tooltip: 'Salvar Arquivo',
			iconset: 'fi'
		});

		toolBar.addSpacer();

		toolBar.addButton({
			icon: 'photo',
      callback: 'otmsuite-utils:toggle-image-viewer',
      tooltip: 'Abrir Lista de Imagens',
			iconset: 'fi'
		});

		toolBar.addButton({
			icon: 'android-color-palette',
      callback: 'otmsuite-utils:openColorPicker',
      tooltip: 'Abrir Paleta de Cores',
			iconset: 'ion'
		});

		toolBar.addButton({
			icon: 'search',
      callback: 'find-and-replace:toggle',
      tooltip: 'Procurar e Substituir',
			iconset: 'ion'
		});

		toolBar.addButton({
			icon: 'page-search',
      callback: 'project-find:toggle',
      tooltip: 'Procurar e Substituir no Projeto',
			iconset: 'fi'
		});

		toolBar.addButton({
			icon: 'paragraph',
      callback: 'window:toggle-invisibles',
      tooltip: 'Exibir todos os caracteres',
			iconset: 'fa'
		});

		toolBar.addSpacer();

		toolBar.addButton({
			icon: 'columns',
      callback: 'pane:split-right',
      tooltip: 'Dividir Tela (Horizontal)',
			iconset: 'fa'
		});

		toolBar.addButton({
			icon: 'contrast',
      callback: 'otmsuite-utils:themes-toggle',
      tooltip: 'Mudar Tema',
			iconset: 'ion'
		});

		toolBar.addButton({
			icon: 'refresh',
      callback: 'window:reload',
      tooltip: 'Recarregar Janela',
			iconset: 'ion'
		});

		toolBar.addSpacer();

		toolBar.addButton({
			icon: 'code',
      callback: 'snippets:available',
      tooltip: 'Snippets Disponíveis',
			iconset: 'fa'
		});

		toolBar.addButton({
			icon: 'navicon-round',
      callback: 'command-palette:toggle',
      tooltip: 'Paleta de Comandos',
			iconset: 'ion'
		});

		toolBar.addButton({
			icon: 'ios-gear',
      callback: 'settings-view:open',
      tooltip: 'Configurações do Atom',
			iconset: 'ion'
		});
	},

  deactivate: function() {
		if (toolBar) {
	    toolBar.removeItems();
	    toolBar = null;
	  }
    return (_ref = this.view) != null ? _ref.destroy() : void 0;
  },

	config: {
	  otmtechDir: {
			title: 'Diretório Otmtech',
	    type: 'string',
	    default: 'D:/Otmtech',
	    order: 1
	  },
    randomColor: {
      title: 'Serve a random color on open',
      description: 'If the Color Picker doesn\'t get an input color, it serves a completely random color.',
      type: 'boolean',
      "default": true
    },
    automaticReplace: {
      title: 'Automatically Replace Color',
      description: 'Replace selected color automatically on change. Works well with as-you-type CSS reloaders.',
      type: 'boolean',
      "default": false
    },
    abbreviateValues: {
      title: 'Abbreviate Color Values',
      description: 'If possible, abbreviate color values, like for example “0.3” to “.3”,  “#ffffff” to “#fff” and “rgb(0, 0, 0)” to “rgb(0,0,0)”.',
      type: 'boolean',
      "default": false
    },
    uppercaseColorValues: {
      title: 'Uppercase Color Values',
      description: 'If sensible, uppercase the color value. For example, “#aaa” becomes “#AAA”.',
      type: 'boolean',
      "default": false
    },
    preferredFormat: {
      title: 'Preferred Color Format',
      description: 'On open, the Color Picker will show a color in this format.',
      type: 'string',
      "enum": ['RGB', 'HEX', 'HSL', 'HSV', 'VEC'],
      "default": 'RGB'
    },
    triggerKey: {
      title: 'Trigger key',
      description: 'Decide what trigger key should open the Color Picker. `CMD-SHIFT-{TRIGGER_KEY}` and `CTRL-ALT-{TRIGGER_KEY}`. Requires a restart.',
      type: 'string',
      "enum": ['C', 'E', 'H', 'K'],
      "default": 'C'
    }
	},
};
