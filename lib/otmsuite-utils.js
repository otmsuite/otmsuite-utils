const ImageViewer = require('./image-viewer');

var CompositeDisposable;
var toolBar;

let imageViewer = null;

module.exports={
  subscription: null,

  activate: function(state) {
		var apd = require("atom-package-deps");
		apd.install(null, false);
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
      callback: 'color-picker:open',
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
  },

	config: {
	  otmtechDir: {
			title: 'Diretório Otmtech',
	    type: 'string',
	    default: 'D:/Otmtech',
	    order: 1
	  }
	},
};
