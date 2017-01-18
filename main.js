/*
*	archi1016@gmail.com
*/

var PERFIX_URL_TEXT		= 'data:text/plain,';
var PREFIX_URL_SVG		= 'data:image/svg+xml,';

var DRAG_IS_COVER		= 'cover';
var DRAG_IS_WORD		= 'word';

var CLASS_NAME_HIDE		= 'hide';
var CLASS_NAME_FOCUS		= 'focus';
var CLASS_NAME_CHECKED		= 'checked';

var ATTRIBUTE_CLASS		= 'class';
var ATTRIBUTE_STYLE		= 'style';
var ATTRIBUTE_DRAG		= 'drag';
var ATTRIBUTE_INDEX		= 'index';
var ATTRIBUTE_PANEL		= 'panel';

var PROPERTY_CONTENT		= 'content';
var PROPERTY_X			= 'x';
var PROPERTY_Y			= 'y';
var PROPERTY_FAMILY		= 'family';
var PROPERTY_SIZE		= 'size';
var PROPERTY_SPACING		= 'spacing';
var PROPERTY_LINE_HEIGHT	= 'line_height';
var PROPERTY_COLOR		= 'color';
var PROPERTY_BOLD		= 'bold';
var PROPERTY_ITALIC		= 'italic';
var PROPERTY_H_ALIGN		= 'h-align';
var PROPERTY_BACKGROUND_ALPHA	= 'background-alpha';
var PROPERTY_BACKGROUND_COLOR	= 'background-color';
var PROPERTY_PADDING_TOP	= 'padding-top';
var PROPERTY_PADDING_RIGHT	= 'padding-right';
var PROPERTY_PADDING_BOTTOM	= 'padding-bottom';
var PROPERTY_PADDING_LEFT	= 'padding-left';
var PROPERTY_BORDER_STYLE	= 'border-style';
var PROPERTY_BORDER_WIDTH	= 'border-width';
var PROPERTY_BORDER_COLOR	= 'border-color';
var PROPERTY_BOX_SHADOW_H	= 'box-shadow-h';
var PROPERTY_BOX_SHADOW_V	= 'box-shadow-v';
var PROPERTY_BOX_SHADOW_BLUR	= 'box-shadow-blur';
var PROPERTY_BOX_SHADOW_SPREAD	= 'box-shadow-spread';
var PROPERTY_BOX_SHADOW_ALPHA	= 'box-shadow-alpha';
var PROPERTY_BOX_SHADOW_COLOR	= 'box-shadow-color';
var PROPERTY_ROUND_TOP_LEFT	= 'round-top-left';
var PROPERTY_ROUND_TOP_RIGHT	= 'round-top-right';
var PROPERTY_ROUND_BOTTOM_LEFT	= 'round-bottom-left';
var PROPERTY_ROUND_BOTTOM_RIGHT	= 'round-bottom-right';
var PROPERTY_SHADOW_H		= 'shadow-h';
var PROPERTY_SHADOW_V		= 'shadow-v';
var PROPERTY_SHADOW_BLUR	= 'shadow-blur';
var PROPERTY_SHADOW_COLOR	= 'shadow-color';
var PROPERTY_TRANSFORM_ORIGIN_X	= 'transform-origin-x';
var PROPERTY_TRANSFORM_ORIGIN_Y	= 'transform-origin-y';
var PROPERTY_TRANSFORM_ROTATE	= 'transform-rotate';
var PROPERTY_TRANSFORM_SKEW_X	= 'transform-skew-x';
var PROPERTY_TRANSFORM_SKEW_Y	= 'transform-skew-y';
var PROPERTY_TRANSFORM_MIRROR_H	= 'transform-mirror-h';
var PROPERTY_TRANSFORM_MIRROR_V	= 'transform-mirror-v';

var PROPERTY_FILTER_BLUR	= 'filter-blur';
var PROPERTY_FILTER_GRAYSCALE	= 'filter-grayscale';
var PROPERTY_FILTER_SEPIA	= 'filter-sepia';
var PROPERTY_FILTER_SATURATE	= 'filter-saturate';
var PROPERTY_FILTER_HUE		= 'filter-hue';
var PROPERTY_FILTER_INVERT	= 'filter-invert';
var PROPERTY_FILTER_BRIGHTNESS	= 'filter-brightness';
var PROPERTY_FILTER_CONTRAST	= 'filter-contrast';
var PROPERTY_FILTER_MIRROR_H	= 'filter-mirror-h';
var PROPERTY_FILTER_MIRROR_V	= 'filter-mirror-v';

var PROPERTY_GLOBAL_LOCK_COVER		= 'global-lock-cover';
var PROPERTY_GLOBAL_LOCK_H		= 'global-lock-h';
var PROPERTY_GLOBAL_LOCK_V		= 'global-lock-v';
var PROPERTY_GLOBAL_GRID_X		= 'global-grid-x';
var PROPERTY_GLOBAL_GRID_Y		= 'global-grid-y';
var PROPERTY_GLOBAL_PROFILE_PHOTO	= 'global-profile-photo';

var PROPERTY_FAMILY_LIST	= 'family-list';
var PROPERTY_FAMILY_DEMO	= 'family-demo';

var STORAGE_RIBBON_BAR_INDEX	= 'ribbon-bar-index';
var STORAGE_FILE_PANEL_INDEX	= 'file-panel-index';
var STORAGE_COVER_SRC		= 'cover-src';
var STORAGE_COVER_OFFSET_Y	= 'cover-offset-y';
var STORAGE_COVER_FILTER	= 'cover-filter';
var STORAGE_WORD_PROPERTY	= 'word-property';
var STORAGE_GLOBAL_PARAMETER	= 'global-parameter';
var STORAGE_FAMILY		= 'family';
var STORAGE_WORD_DB		= 'word-db';

var ALIGN_VALUE_LEFT		= 'left';
var ALIGN_VALUE_CENTER		= 'center';
var ALIGN_VALUE_RIGHT		= 'right';
var ALIGN_VALUE_TOP		= 'top';
var ALIGN_VALUE_BOTTOM		= 'bottom';

var JSON_TYPE_WORD		= 'word';
var JSON_TYPE_PROJECT		= 'project';

var JSON_EXTENSION_WORD		= '.fbcw-word';
var JSON_EXTENSION_PROJECT	= '.fbcw-project';


var GLOBAL_PARAMETER = {
	lock_cover: 0
	,lock: {
		h: 0
		,v: 0
	}
	,grid: {
		x: 0
		,y: 0
	}
	,profile_photo: '0'
	,init: function () {
		this.lock_cover		= document.getElementById('global-lock-cover');
		this.lock.h		= document.getElementById('global-lock-h');
		this.lock.v		= document.getElementById('global-lock-v');
		this.grid.x		= document.getElementById('global-grid-x');
		this.grid.y		= document.getElementById('global-grid-y');
		
		this.load_parameter();
		
		this.lock_cover.onclick = function () {
			GLOBAL_PARAMETER.change_lock_status(this);
		};
		this.lock.h.onclick = function () {
			GLOBAL_PARAMETER.change_lock_status(this);
		};
		this.lock.v.onclick = function () {
			GLOBAL_PARAMETER.change_lock_status(this);
		};
		this.grid.x.onchange = function () {
			GLOBAL_PARAMETER.save_parameter();
		};
		this.grid.y.onchange = function () {
			GLOBAL_PARAMETER.save_parameter();
		};
	}
	,load_parameter: function () {
		var s = get_local_data(STORAGE_GLOBAL_PARAMETER);
		var gps;
		
		if ('' == s) return;
		
		gps = JSON.parse(s);

		set_button_status(this.lock_cover	,gps[PROPERTY_GLOBAL_LOCK_COVER]);
		set_button_status(this.lock.h		,gps[PROPERTY_GLOBAL_LOCK_H]);
		set_button_status(this.lock.v		,gps[PROPERTY_GLOBAL_LOCK_V]);
		this.grid.x.value	= gps[PROPERTY_GLOBAL_GRID_X];
		this.grid.y.value	= gps[PROPERTY_GLOBAL_GRID_Y];
		this.profile_photo	= gps[PROPERTY_GLOBAL_PROFILE_PHOTO];
	}
	,save_parameter: function () {
		var gps = {};
		
		gps[PROPERTY_GLOBAL_LOCK_COVER]		= get_button_status(this.lock_cover);
		gps[PROPERTY_GLOBAL_LOCK_H]		= get_button_status(this.lock.h);
		gps[PROPERTY_GLOBAL_LOCK_V]		= get_button_status(this.lock.v);
		gps[PROPERTY_GLOBAL_GRID_X]		= this.grid.x.value;
		gps[PROPERTY_GLOBAL_GRID_Y]		= this.grid.y.value;
		gps[PROPERTY_GLOBAL_PROFILE_PHOTO]	= this.profile_photo;

		set_local_data(STORAGE_GLOBAL_PARAMETER, JSON.stringify(gps));
	}
	,get_grid_x: function () {
		return parseInt(this.grid.x.value);
	}
	,get_grid_y: function () {
		return parseInt(this.grid.y.value);
	}
	,is_profile_photo: function () {
		return ('1' == this.profile_photo);
	}
	,set_profile_photo: function (v) {
		this.profile_photo = v;
		this.save_parameter();
	}
	,change_lock_status: function (n) {
		ret_button_on_or_off(n);
		this.save_parameter();
	}
	,is_lock_cover: function () {
		return ('1' == get_button_status(this.lock_cover));
	}
	,is_lock_h: function () {
		return ('1' == get_button_status(this.lock.h));
	}
	,is_lock_v: function () {
		return ('1' == get_button_status(this.lock.v));
	}
};

var RIBBON_BAR = {
	bar: {
		labs: []
		,panels: []
		,focus_index: 0
	}
	,file: {
		labs: []
		,panels: []
		,focus_index: 0
	}
	,panFile: null
	,init: function () {
		this.panFile = document.getElementById('ribbon-file');
		this.init_bar();
		this.init_file();
	}
	,init_bar: function () {
		var chds = document.getElementById('ribbon-tab').firstChild.childNodes;
		var i;
		var r;

		r = 0;
		for (i=0; i<chds.length; i++) {
			if ('DIV' == chds[i].nodeName) {
				if (chds[i].hasAttribute(ATTRIBUTE_PANEL)) {
					this.bar.panels[r] = document.getElementById('ribbon-'+chds[i].getAttribute(ATTRIBUTE_PANEL));
					if (this.bar.panels[r]) {
						this.bar.labs[r] = chds[i];
						this.bar.labs[r].setAttribute(ATTRIBUTE_INDEX, r);
						this.bar.labs[r].onclick = function (ev) {
							RIBBON_BAR.change_bar_tab(ev.target);
						};
						r++;
					}
				}
			}
		}
		this.set_first_focus_index(this.bar, STORAGE_RIBBON_BAR_INDEX);
	}
	,init_file: function () {
		var chds = document.getElementById('file-tab').childNodes;
		var i;
		var r;

		r = 0;
		for (i=0; i<chds.length; i++) {
			if ('DIV' == chds[i].nodeName) {
				if (chds[i].hasAttribute(ATTRIBUTE_PANEL)) {
					this.file.panels[r] = document.getElementById('file-'+chds[i].getAttribute(ATTRIBUTE_PANEL));
					if (this.file.panels[r]) {
						this.file.labs[r] = chds[i];
						this.file.labs[r].setAttribute(ATTRIBUTE_INDEX, r);
						this.file.labs[r].onclick = function (ev) {
							RIBBON_BAR.change_file_tab(ev.target);
						};
						r++;
					}
				}
			}
		}
		this.set_first_focus_index(this.file, STORAGE_FILE_PANEL_INDEX);
	}
	,set_first_focus_index: function (d, sid) {
		d.focus_index = get_local_data_int(sid);
		if (d.focus_index >= d.labs.length) d.focus_index = 0;
		d.labs[d.focus_index].className = CLASS_NAME_FOCUS;
		d.panels[d.focus_index].style.display = 'block';
	}
	,change_tab: function (d, ni, sid) {
		if (d.focus_index != ni) {
			d.labs[d.focus_index].className = '';
			d.panels[d.focus_index].style.display = 'none';
			d.focus_index = ni;
			d.labs[d.focus_index].className = CLASS_NAME_FOCUS;
			d.panels[d.focus_index].style.display = 'block';
			
			set_local_data(sid, d.focus_index);
		}
	}
	,change_bar_tab: function (n) {
		this.change_tab(this.bar, parseInt(n.getAttribute(ATTRIBUTE_INDEX)), STORAGE_RIBBON_BAR_INDEX);
	}
	,change_file_tab: function (n) {
		this.change_tab(this.file, parseInt(n.getAttribute(ATTRIBUTE_INDEX)), STORAGE_FILE_PANEL_INDEX);
	}
	,show_file_panel: function () {
		STATUS_BAR.hide();
		this.panFile.className = '';
	}
	,close_file_panel: function () {
		STATUS_BAR.show();
		this.panFile.className = CLASS_NAME_HIDE;
	}
};

var DRAG_CONTROLL = {
	kind: ''
	,is_drag: false
	,down: function (ev) {
		this.kind = '';
		this.is_drag = false;
		if (0 != ev.button) return;
		
		if (ev.target.hasAttribute(ATTRIBUTE_DRAG)) {
			this.kind = safe_get_node_attribute(ev.target, ATTRIBUTE_DRAG);
			this.is_drag = true;
			switch (this.kind) {
				case DRAG_IS_COVER:
					COVER_PHOTO.mouse_down(ev);
					break;
				case DRAG_IS_WORD:
					FONT_OP.word_mouse_down(ev);
					break;
				default:
					this.is_drag = false;
					break;
			}
		}
		if (this.is_drag) {
			document.onmousemove = DRAG_CONTROLL.move;
			ev.preventDefault();
		}
	}
	,up: function (ev) {
		if (this.is_drag) {
			document.onmousemove = null;
			switch (this.kind) {
				case DRAG_IS_COVER:
					COVER_PHOTO.mouse_up(ev);
					break;
				case DRAG_IS_WORD:
					FONT_OP.word_mouse_up(ev);
					break;
			}
			this.kind = '';
			this.is_drag = false;
		}
	}
	,move: function (ev) {
		if (!this.is_drag) return;
		
		switch (this.kind) {
			case DRAG_IS_COVER:
				COVER_PHOTO.mouse_move(ev);
				break;
			case DRAG_IS_WORD:
				FONT_OP.word_mouse_move(ev);
				break;
		}
	}
};

var COVER_PHOTO = {
	eleFile: null
	,eleCoverContainer: null
	,eleCover: null
	,eleBackgroundContainer: null
	,eleBackground: null
	,eleProfilePhoto: null
	,eleCanvas: null
	,eleCanvasContext: null
	,dlgDownload: null
	,position: {
		limit: 0
		,offset: 0
	}
	,filter: {
		enabled: true
		,blur: null
		,grayscale: null
		,sepia: null
		,saturate: null
		,hue: null
		,invert: null
		,brightness: null
		,contrast: null
		,reset: null
		,mirror: {
			h: null
			,v: null
		}
	}
	,init: function () {
		this.eleFile			= document.getElementById('dialog-for-load');
		this.eleCoverContainer		= document.getElementById('cover-photo');
		this.eleCover			= this.eleCoverContainer.firstChild;
		this.eleBackgroundContainer	= document.getElementById('background-photo');
		this.eleBackground		= this.eleBackgroundContainer.firstChild;
		this.eleProfilePhoto		= document.getElementById('profile-photo');
		this.eleCanvas			= document.getElementById('draw-and-save-image');
		this.eleCanvasContext		= this.eleCanvas.getContext("2d");
		this.dlgDownload		= document.getElementById('dialog-for-download');
		
		this.filter.blur		= document.getElementById('filter-blur');
		this.filter.grayscale		= document.getElementById('filter-grayscale');
		this.filter.sepia		= document.getElementById('filter-sepia');
		this.filter.saturate		= document.getElementById('filter-saturate');
		this.filter.hue			= document.getElementById('filter-hue');
		this.filter.invert		= document.getElementById('filter-invert');
		this.filter.brightness		= document.getElementById('filter-brightness');
		this.filter.contrast		= document.getElementById('filter-contrast');
		this.filter.mirror.h		= document.getElementById('filter-mirror-h');
		this.filter.mirror.v		= document.getElementById('filter-mirror-v');
		this.filter.reset		= document.getElementById('filter-reset');
		
		this.load_cover();
		this.load_filter();
		this.load_word();
		this.load_global();
		
		this.eleCover.onload = function () {
			COVER_PHOTO.relayout_cover_position();
			COVER_PHOTO.save_cover();
		};
		this.eleCover.onclick = function () {
			FONT_OP.set_no_selected_word();
		}
		
		this.filter.blur.onchange	= function () {COVER_PHOTO.change_filter();};
		this.filter.grayscale.onchange	= function () {COVER_PHOTO.change_filter();};
		this.filter.sepia.onchange	= function () {COVER_PHOTO.change_filter();};
		this.filter.saturate.onchange	= function () {COVER_PHOTO.change_filter();};
		this.filter.hue.onchange	= function () {COVER_PHOTO.change_filter();};
		this.filter.invert.onchange	= function () {COVER_PHOTO.change_filter();};
		this.filter.brightness.onchange	= function () {COVER_PHOTO.change_filter();};
		this.filter.contrast.onchange	= function () {COVER_PHOTO.change_filter();};
		this.filter.mirror.h.onclick	= function () {
				COVER_PHOTO.change_mirror_h(this);
		};
		this.filter.mirror.v.onclick	= function () {
				COVER_PHOTO.change_mirror_v(this);
		};
		this.filter.reset.onclick = function () {
				COVER_PHOTO.reset_filter();
		};
	}
	,load_global: function () {
		if (GLOBAL_PARAMETER.is_profile_photo()) {
			STATUS_BAR.set_profile_photo_checked(true);
			this.eleProfilePhoto.className = '';
		}
	}
	,load_cover: function () {
		var u = get_local_data(STORAGE_COVER_SRC);
		
		if ('' != u) {
			this.eleCover.src = u;
			this.position.offset = get_local_data_int(STORAGE_COVER_OFFSET_Y);
			this.eleCover.style.top = (0-this.position.offset)+'px';
		}
	}
	,save_cover: function () {
		set_local_data(STORAGE_COVER_SRC, this.eleCover.src);
	}
	,export_cover_photo: function () {
		var w = this.eleCanvas.width;
		var h = this.eleCanvas.height;
		var s;
		var img = new Image();

		img.onload = function () {
			COVER_PHOTO.draw_svg_image(img);
		};
		img.src = this.get_word_svg_url(w, h);
	}
	,draw_svg_image: function (img) {
		this.eleCanvasContext.drawImage(img, 0, 0);
		this.dlgDownload.href = this.eleCanvas.toDataURL('image/png');
		this.dlgDownload.download = STR.export_cover_file+'.png';
		this.dlgDownload.click();
	}
	,get_word_svg_url: function (w, h) {
		var s = PREFIX_URL_SVG;
		var chds;
		var i;
		
		s += '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'">';
		s += '<foreignObject width="100%" height="100%">';
		s += '<body xmlns="http://www.w3.org/1999/xhtml" style="margin: 0;width: 100%; height: 100%; overflow: hidden; background-color : #282828;">';
		s += '<img src="'+this.eleCover.src+'" style="position: absolute; display: block; left: 0;width: 100%; '+safe_get_node_attribute(this.eleCover, ATTRIBUTE_STYLE)+'" />';
		chds = this.eleCoverContainer.childNodes;
		for (i=0; i<chds.length; i++) {
			if ('DIV' == chds[i].nodeName) {
				s += '<div style="position: absolute; '+chds[i].getAttribute(ATTRIBUTE_STYLE)+'">'+chds[i].innerHTML.replace(/<br>/g, '<br />')+'</div>';
			}
		}
		s += '</body></foreignObject></svg>';
		
		return s;
	}
	,export_project_to_file: function () {
		var db = {};
		var s;
		
		this.build_word_db(db);
		db.type = JSON_TYPE_PROJECT;
		db.cover = {
			src: this.eleCover.src
			,offset: this.position.offset
			,filter: {}
		};
		this.build_filter_db(db.cover.filter);
		s = JSON.stringify(db, null, "\t");
		this.dlgDownload.href = URL.createObjectURL(ret_blob_from_url(s, 'text/plain'));
		this.dlgDownload.download = STR.export_project_file+JSON_EXTENSION_PROJECT;
		this.dlgDownload.click();
	}
	,set_cover_from_db: function (db) {
		set_local_data(STORAGE_COVER_OFFSET_Y, db.cover.offset);
		this.eleCover.src = db.cover.src;
		this.set_filter_from_db(db.cover.filter);
		this.change_filter();
	}
	,load_project_from_file: function () {
		this.eleFile.accept = JSON_EXTENSION_PROJECT;
		this.eleFile.onchange = function (ev) {
			var r;

			if (ev.target.files[0]) {
				r = new FileReader();
				r.onload = function (d) {
					var db = JSON.parse(d.target.result);

					if (JSON_TYPE_PROJECT == db.type) {
						COVER_PHOTO.clear_word();
						COVER_PHOTO.insert_word_from_db(db);
						COVER_PHOTO.set_cover_from_db(db);
						COVER_PHOTO.save_word();
						COVER_PHOTO.save_cover();
						COVER_PHOTO.clear_selected_file();
						RIBBON_BAR.close_file_panel();
					}
				};
				r.readAsText(ev.target.files[0]);
			}
		};
		this.eleFile.click();
	}
	,load_word: function () {
		var s = get_local_data(STORAGE_WORD_DB);
		var was;
		
		if ('' == s) return;
		
		was = JSON.parse(s);
		this.insert_word_from_db(was);
	}
	,save_word: function () {
		var db = {};
		
		this.build_word_db(db);
		set_local_data(STORAGE_WORD_DB, JSON.stringify(db));
	}
	,export_word_to_file: function () {
		var db = {};

		this.build_word_db(db);
		this.dlgDownload.href = PERFIX_URL_TEXT + JSON.stringify(db, null, "\t");
		this.dlgDownload.download = STR.export_word_file+JSON_EXTENSION_WORD;
		this.dlgDownload.click();
	}
	,import_word_from_file: function () {
		this.eleFile.accept = JSON_EXTENSION_WORD;
		this.eleFile.onchange = function (ev) {
			var r;

			if (ev.target.files[0]) {
				r = new FileReader();
				r.onload = function (d) {
					var db = JSON.parse(d.target.result);

					if (JSON_TYPE_WORD == db.type) {
						COVER_PHOTO.insert_word_from_db(db);
						COVER_PHOTO.save_word();
						COVER_PHOTO.clear_selected_file();
					}
				};
				r.readAsText(ev.target.files[0]);
			}
		};
		this.eleFile.click();
	}
	,load_word_form_file: function () {
		if (!confirm(STR.confirm_load_word)) return;
		
		this.eleFile.accept = JSON_EXTENSION_WORD;
		this.eleFile.onchange = function (ev) {
			var r;

			if (ev.target.files[0]) {
				r = new FileReader();
				r.onload = function (d) {
					var db = JSON.parse(d.target.result);

					if (JSON_TYPE_WORD == db.type) {
						COVER_PHOTO.clear_word();
						COVER_PHOTO.insert_word_from_db(db);
						COVER_PHOTO.save_word();
						COVER_PHOTO.clear_selected_file();
					}
				};
				r.readAsText(ev.target.files[0]);
			}
		};
		this.eleFile.click();
	}
	,clear_word: function () {
		var chds = this.eleCoverContainer.childNodes;
		var i;
		
		FONT_OP.set_no_selected_word();
		for (i=chds.length-1; i>=0; i--) {
			if ('DIV' == chds[i].nodeName) {
				COVER_PHOTO.eleCoverContainer.removeChild(chds[i]);
			}
		}
	}
	,build_word_db: function (db) {
		var chds = this.eleCoverContainer.childNodes;
		var i;
		var r = 0;
		var atts;
		var j;
		
		db.type = JSON_TYPE_WORD
		db.word = [];
		for (i=0; i<chds.length; i++) {
			if ('DIV' == chds[i].nodeName) {
				atts = chds[i].attributes;
				db.word[r] = {
					content: chds[i].innerHTML
					,property: {}
				};
				for (j=0; j<atts.length; j++) {
					if ((ATTRIBUTE_STYLE != atts[j].name) && (ATTRIBUTE_CLASS != atts[j].name)) {
						db.word[r].property[atts[j].name] = atts[j].value;
					}
				}
				r++;
			}
		}
	}
	,insert_word_from_db: function (db) {
		var i;
		var div;
		var k;
		
		for (i=0; i<db.word.length; i++) {
			div = document.createElement('div');
			div.innerHTML = db.word[i].content;
			for (k in db.word[i].property) {
				div.setAttribute(k, db.word[i].property[k]);
			}
			FONT_OP.build_word_style(div);
			this.eleCoverContainer.appendChild(div);
		}
		STATUS_BAR.set_qty(this.get_word_qty());
	}
	,load_filter: function () {
		var s = get_local_data(STORAGE_COVER_FILTER);
		var cps;
		
		if ('' == s) return;
		
		cps = JSON.parse(s);

		this.set_filter_from_db(cps);
		this.change_filter();
	}
	,reset_filter: function () {
		if (!confirm(STR.confirm_reset_filter)) return;
		
		this.filter.enabled = false;
		this.filter.blur.value		= '0';
		this.filter.grayscale.value	= '0';
		this.filter.sepia.value		= '0';
		this.filter.hue.value		= '0';
		this.filter.invert.value	= '0';
		this.filter.saturate.value	= '1';
		this.filter.brightness.value	= '1';
		this.filter.contrast.value	= '1';
		this.filter.enabled = true;
		
		this.change_filter();
	}
	,change_filter: function () {
		var cps = {};
		var ft = [];
		var tf = [];
		var a = 0;
		
		this.build_filter_db(cps);
		set_local_data(STORAGE_COVER_FILTER, JSON.stringify(cps));
		
		if (!this.filter.enabled) return;
		
		if (cps[PROPERTY_FILTER_BLUR] > 0) {
			ft[a] = 'blur('+cps[PROPERTY_FILTER_BLUR]+'px)';		a++;
		}
		if (cps[PROPERTY_FILTER_GRAYSCALE] > 0) {
			ft[a] = 'grayscale('+cps[PROPERTY_FILTER_GRAYSCALE]+'%)';	a++;
		}
		if (cps[PROPERTY_FILTER_SEPIA] > 0) {
			ft[a] = 'sepia('+cps[PROPERTY_FILTER_SEPIA]+'%)';		a++;
		}
		if (cps[PROPERTY_FILTER_HUE] > 0) {
			ft[a] = 'hue-rotate('+cps[PROPERTY_FILTER_HUE]+'deg)';		a++;
		}
		if (cps[PROPERTY_FILTER_INVERT] > 0) {
			ft[a] = 'invert('+cps[PROPERTY_FILTER_INVERT]+'%)';		a++;
		}
		if (cps[PROPERTY_FILTER_SATURATE] != 1.0) {
			ft[a] = 'saturate('+cps[PROPERTY_FILTER_SATURATE]+')';		a++;
		}
		if (cps[PROPERTY_FILTER_BRIGHTNESS] != 1.0) {
			ft[a] = 'brightness('+cps[PROPERTY_FILTER_BRIGHTNESS]+')';	a++;
		}
		if (cps[PROPERTY_FILTER_CONTRAST] != 1.0) {
			ft[a] = 'contrast('+cps[PROPERTY_FILTER_CONTRAST]+')';		a++;
		}
		if (a > 0) {
			this.eleCover.style.webkitFilter = ft.join(' ');
		} else {
			this.eleCover.style.webkitFilter = 'none';
		}
		
		a = 0;
		if ('1' == cps[PROPERTY_FILTER_MIRROR_H]) {
			tf[a] = 'scaleX(-1)';			a++;
		}
		if ('1' == cps[PROPERTY_FILTER_MIRROR_V]) {
			tf[a] = 'scaleY(-1)';			a++;
		}
		if (a > 0) {
			this.eleCover.style.transform = tf.join(' ');
		} else {
			this.eleCover.style.transform = 'none';
		}
	}
	,change_mirror_h: function (n) {
		var s = ret_button_on_or_off(n);
		
		this.change_filter();
	}
	,change_mirror_v: function (n) {
		var s = ret_button_on_or_off(n);
		
		this.change_filter();
	}
	,set_filter_from_db: function (db) {
		this.filter.enabled = false;
		this.filter.blur.value			= db[PROPERTY_FILTER_BLUR];
		this.filter.grayscale.value		= db[PROPERTY_FILTER_GRAYSCALE];
		this.filter.sepia.value			= db[PROPERTY_FILTER_SEPIA];
		this.filter.hue.value			= db[PROPERTY_FILTER_HUE];
		this.filter.invert.value		= db[PROPERTY_FILTER_INVERT];
		this.filter.saturate.value		= db[PROPERTY_FILTER_SATURATE];
		this.filter.brightness.value		= db[PROPERTY_FILTER_BRIGHTNESS];
		this.filter.contrast.value		= db[PROPERTY_FILTER_CONTRAST];
		set_button_status(this.filter.mirror.h		,db[PROPERTY_FILTER_MIRROR_H]);
		set_button_status(this.filter.mirror.v		,db[PROPERTY_FILTER_MIRROR_V]);
		this.filter.enabled = true;
	}
	,build_filter_db: function (db) {
		db[PROPERTY_FILTER_BLUR]	= parseInt(this.filter.blur.value);
		db[PROPERTY_FILTER_GRAYSCALE]	= parseInt(this.filter.grayscale.value);
		db[PROPERTY_FILTER_SEPIA]	= parseInt(this.filter.sepia.value);
		db[PROPERTY_FILTER_HUE]		= parseInt(this.filter.hue.value);
		db[PROPERTY_FILTER_INVERT]	= parseInt(this.filter.invert.value);
		db[PROPERTY_FILTER_SATURATE]	= parseFloat(this.filter.saturate.value);
		db[PROPERTY_FILTER_BRIGHTNESS]	= parseFloat(this.filter.brightness.value);
		db[PROPERTY_FILTER_CONTRAST]	= parseFloat(this.filter.contrast.value);
		db[PROPERTY_FILTER_MIRROR_H]	= get_button_status(this.filter.mirror.h);
		db[PROPERTY_FILTER_MIRROR_V]	= get_button_status(this.filter.mirror.v);
	}
	,show_load_dialog: function () {
		this.eleFile.accept = 'image/*';
		this.eleFile.onchange = function (ev) {
			var r;

			if (ev.target.files[0]) {
				r = new FileReader();
				r.onload = function (d) {
					set_local_data(STORAGE_COVER_OFFSET_Y, '0');
					COVER_PHOTO.eleCover.src = d.target.result;
					COVER_PHOTO.clear_selected_file();
				};
				r.readAsDataURL(ev.target.files[0]);
			}
		};
		this.eleFile.click();
	}
	,show_url_dialog: function () {
		var u = prompt(STR.cover_from_url, 'http://');
		
		if (null != u) {
			this.eleCover.src = u;
		}
	}
	,clear_selected_file: function () {
		this.eleFile.form.reset();
	}
	,get_offset: function () {
		return this.position.offset;
	}
	,relayout_cover_position: function () {
		this.position.limit = this.eleCover.height - this.eleCoverContainer.clientHeight;
		this.position.offset = parseInt(get_local_data(STORAGE_COVER_OFFSET_Y));
		this.eleCover.style.top = (0-this.position.offset)+'px';
		
		if (this.eleCover.hasAttribute(ATTRIBUTE_DRAG)) {
			this.eleCover.removeAttribute(ATTRIBUTE_DRAG);
		}
		if (this.position.limit > 0) {
			this.eleCover.setAttribute(ATTRIBUTE_DRAG, DRAG_IS_COVER);
		}
		
		this.eleBackground.src = this.eleCover.src;
		this.relayout_background_position();
	}
	,relayout_background_position: function () {
		var p = this.position.offset / this.eleCover.height;
		var o = parseInt(this.eleBackground.height * p);
		
		this.eleBackgroundContainer.style.top = (0-o)+'px';
	}
	,get_word_qty: function () {
		var chds = this.eleCoverContainer.childNodes;
		var i;
		var q = 0;
		
		for (i=0; i<chds.length; i++) {
			if ('DIV' == chds[i].nodeName) {
				q++;
			}
		}
		return q;
	}
	,hide_or_show_profile_photo: function (n) {
		if (CLASS_NAME_CHECKED == n.className) {
			n.className = '';
			this.eleProfilePhoto.className = CLASS_NAME_HIDE;
			GLOBAL_PARAMETER.set_profile_photo('0');
		} else {
			n.className = CLASS_NAME_CHECKED;
			this.eleProfilePhoto.className = '';
			GLOBAL_PARAMETER.set_profile_photo('1');
		}
	}
	,mouse_down: function (ev) {
		py = ev.clientY;
	}
	,mouse_up: function (ev) {
	}
	,mouse_move: function (ev) {
		var v;
		
		if (GLOBAL_PARAMETER.is_lock_cover()) return;
		
		v = py - ev.clientY;
		this.position.offset += v;
		if (this.position.offset > this.position.limit) this.position.offset = this.position.limit;
		if (0 > this.position.offset) this.position.offset = 0;
		this.eleCover.style.top = (0-this.position.offset)+'px';
		
		this.relayout_background_position();
		
		set_local_data(STORAGE_COVER_OFFSET_Y, this.position.offset);
		
		py = ev.clientY;
	}
}

var FONT_OP = {
	selected_word: null
	,eleColorPicker: null
	,word: {
		insert: null
		,content: null
		,size: null
		,spacing: null
		,line_height: null
		,color: null
		,bold: null
		,italic: null
		,align: {
			left: null
			,center: null
			,right: null
			,value: ALIGN_VALUE_LEFT
		}
		,background: {
			alpha: null
			,color: null
		}
		,padding: {
			top: null
			,right: null
			,bottom: null
			,left: null
		}
		,border: {
			style: null
			,width: null
			,color: null
		}
		,box_shadow: {
			h: null
			,v: null
			,blur : null
			,spread: null
			,alpha: null
			,color: null
		}
		,round: {
			top: {
				left: null
				,right: null
			}
			,bottom: {
				left: null
				,right: null
			}
		}
		,shadow: {
			h: null
			,v: null
			,blur : null
			,color: null
		}
		,transform: {
			rotate: null
			,origin: {
				x: null
				,y: null
			}
			,skew: {
				x: null
				,y: null
			}
			,mirror: {
				h: null
				,v: null
			}
		}
		,position: {
			default_x: 40
			,default_y: 40
		}
	}
	,grid: {
		x: 0
		,y: 0
	}
	,family_container : null
	,family_index: 0
	,family_elements: []
	,init: function () {
		var insert_word_button =	 document.getElementById('word-insert-button');
	
		this.eleColorPicker		= document.getElementById('dialog-for-color');
		this.family_container		= document.getElementById('word-family-table');
		this.word.insert		= document.getElementById('word-insert');
		
		this.word.content		= document.getElementById('word-content');
		this.word.size			= document.getElementById('word-size');
		this.word.spacing		= document.getElementById('word-spacing');
		this.word.line_height		= document.getElementById('word-line-height');
		this.word.color			= document.getElementById('word-color');
		this.word.bold			= document.getElementById('word-bold');
		this.word.italic		= document.getElementById('word-italic');
		
		this.word.align.left		= document.getElementById('word-align-left');
		this.word.align.center		= document.getElementById('word-align-center');
		this.word.align.right		= document.getElementById('word-align-right');
		
		this.word.background.alpha	= document.getElementById('word-background-alpha');
		this.word.background.color	= document.getElementById('word-background-color');
		
		this.word.padding.top		= document.getElementById('word-padding-top');
		this.word.padding.right		= document.getElementById('word-padding-right');
		this.word.padding.bottom	= document.getElementById('word-padding-bottom');
		this.word.padding.left		= document.getElementById('word-padding-left');
		
		this.word.border.style		= document.getElementById('word-border-style');
		this.word.border.width		= document.getElementById('word-border-width');
		this.word.border.color		= document.getElementById('word-border-color');
		
		this.word.box_shadow.h		= document.getElementById('word-box-shadow-h');
		this.word.box_shadow.v		= document.getElementById('word-box-shadow-v');
		this.word.box_shadow.blur	= document.getElementById('word-box-shadow-blur');
		this.word.box_shadow.spread	= document.getElementById('word-box-shadow-spread');
		this.word.box_shadow.alpha	= document.getElementById('word-box-shadow-alpha');
		this.word.box_shadow.color	= document.getElementById('word-box-shadow-color');
		
		this.word.round.top.left	= document.getElementById('word-round-top-left');
		this.word.round.top.right	= document.getElementById('word-round-top-right');
		this.word.round.bottom.left	= document.getElementById('word-round-bottom-left');
		this.word.round.bottom.right	= document.getElementById('word-round-bottom-right');
		
		this.word.shadow.h		= document.getElementById('word-shadow-h');
		this.word.shadow.v		= document.getElementById('word-shadow-v');
		this.word.shadow.blur		= document.getElementById('word-shadow-blur');
		this.word.shadow.color		= document.getElementById('word-shadow-color');
		
		this.word.transform.rotate	= document.getElementById('word-transform-rotate');
		this.word.transform.origin.x	= document.getElementById('word-transform-origin-x');
		this.word.transform.origin.y	= document.getElementById('word-transform-origin-y');
		this.word.transform.skew.x	= document.getElementById('word-transform-skew-x');
		this.word.transform.skew.y	= document.getElementById('word-transform-skew-y');
		this.word.transform.mirror.h	= document.getElementById('word-transform-mirror-h');
		this.word.transform.mirror.v	= document.getElementById('word-transform-mirror-v');
		
		this.word.align.left.className = CLASS_NAME_CHECKED;
		
		this.load_word_property();
		
		this.word.content.oninput		= function () {FONT_OP.change_content();};
		this.word.size.onchange			= function () {FONT_OP.change_size();};
		this.word.spacing.onchange		= function () {FONT_OP.change_spacing();};
		this.word.line_height.onchange		= function () {FONT_OP.change_line_height();};
		this.word.bold.onclick			= function () {FONT_OP.change_bold(this);};
		this.word.italic.onclick		= function () {FONT_OP.change_italic(this);};
		
		this.word.align.left.onclick		= function () {FONT_OP.change_align(this, ALIGN_VALUE_LEFT);};
		this.word.align.center.onclick		= function () {FONT_OP.change_align(this, ALIGN_VALUE_CENTER);};
		this.word.align.right.onclick		= function () {FONT_OP.change_align(this, ALIGN_VALUE_RIGHT);};
		
		this.word.color.onclick			= function () {
				FONT_OP.eleColorPicker.onchange = function () {
					FONT_OP.change_color(this);
				};
				FONT_OP.eleColorPicker.click();
		};
		
		this.word.background.alpha.onchange	= function () {FONT_OP.change_background();};
		this.word.background.color.onclick	= function () {
				FONT_OP.eleColorPicker.onchange = function () {
					FONT_OP.change_background_color(this);
				};
				FONT_OP.eleColorPicker.click();
		};
		
		this.word.border.style.onchange		= function () {FONT_OP.change_border();};
		this.word.border.width.onchange		= function () {FONT_OP.change_border();};
		this.word.border.color.onclick	= function () {
				FONT_OP.eleColorPicker.onchange = function () {
					FONT_OP.change_border_color(this);
				};
				FONT_OP.eleColorPicker.click();
		};
		
		this.word.box_shadow.h.onchange		= function () {FONT_OP.change_box_shadow();};
		this.word.box_shadow.v.onchange		= function () {FONT_OP.change_box_shadow();};
		this.word.box_shadow.blur.onchange	= function () {FONT_OP.change_box_shadow();};
		this.word.box_shadow.spread.onchange	= function () {FONT_OP.change_box_shadow();};
		this.word.box_shadow.alpha.onchange	= function () {FONT_OP.change_box_shadow();};
		this.word.box_shadow.color.onclick	= function () {
				FONT_OP.eleColorPicker.onchange = function () {
					FONT_OP.change_box_shadow_color(this);
				};
				FONT_OP.eleColorPicker.click();
		};
		
		this.word.padding.top.onchange		= function () {FONT_OP.change_padding();};
		this.word.padding.right.onchange	= function () {FONT_OP.change_padding();};
		this.word.padding.bottom.onchange	= function () {FONT_OP.change_padding();};
		this.word.padding.left.onchange		= function () {FONT_OP.change_padding();};
		
		this.word.round.top.left.onchange	= function () {FONT_OP.change_round();};
		this.word.round.top.right.onchange	= function () {FONT_OP.change_round();};
		this.word.round.bottom.left.onchange	= function () {FONT_OP.change_round();};
		this.word.round.bottom.right.onchange	= function () {FONT_OP.change_round();};
		
		this.word.shadow.h.onchange		= function () {FONT_OP.change_shadow();};
		this.word.shadow.v.onchange		= function () {FONT_OP.change_shadow();};
		this.word.shadow.blur.onchange		= function () {FONT_OP.change_shadow();};
		this.word.shadow.color.onclick		= function () {
				FONT_OP.eleColorPicker.onchange = function () {
					FONT_OP.change_shadow_color(this);
				};
				FONT_OP.eleColorPicker.click();
		};
		
		this.word.transform.rotate.onchange	= function () {FONT_OP.change_transform();};
		this.word.transform.skew.x.onchange	= function () {FONT_OP.change_transform();};
		this.word.transform.skew.y.onchange	= function () {FONT_OP.change_transform();};
		this.word.transform.origin.x.onchange	= function () {FONT_OP.change_transform();};
		this.word.transform.origin.y.onchange	= function () {FONT_OP.change_transform();};
		this.word.transform.mirror.h.onclick	= function () {FONT_OP.change_transform_mirror_h(this);};
		this.word.transform.mirror.v.onclick	= function () {FONT_OP.change_transform_mirror_v(this);};		
		
		insert_word_button.onclick = function () {
			FONT_OP.insert_word();
		};		
	}
	,rebuild_family: function () {
		var i;
		var li;
		var n;

		this.family_index = 0;
		this.family_elements = [];
		this.family_container.innerHTML = '';
		
		for (i=0; i<FAMILY_EDITOR.get_qty(); i++) {
			n = FAMILY_EDITOR.get_name(i);
			li = document.createElement('li');
			li.style.fontFamily = '"'+n+'"';
			li.textContent = n+': '+FAMILY_EDITOR.get_demo();
			li.setAttribute(ATTRIBUTE_INDEX, i);
			li.setAttribute(PROPERTY_FAMILY, n);
			li.onclick = function () {
				FONT_OP.change_family(this);
			};
			this.family_elements[i] = li;
			this.family_container.appendChild(li);
		}
		this.family_container.childNodes[this.family_index].className = CLASS_NAME_FOCUS;
	}
	,change_family: function (n) {
		this.set_family_index(parseInt(n.getAttribute(ATTRIBUTE_INDEX)));
	}
	,set_family_index: function (i) {
		if (this.family_index != i) {
			this.family_elements[this.family_index].className = '';
			this.family_index = i;
			this.family_elements[this.family_index].className = CLASS_NAME_FOCUS;
			
			if (this.is_selected_word_changed()) {
				this.selected_word.setAttribute(PROPERTY_FAMILY, this.family_elements[this.family_index].getAttribute(PROPERTY_FAMILY));
				this.selected_word.style.fontFamily = '"'+this.selected_word.getAttribute(PROPERTY_FAMILY)+'"';
				COVER_PHOTO.save_word();
				this.refresh_word_size();
			}
		}
	}
	,set_family_index_by_name: function (s) {
		var i;
		
		for (i=0; i<this.family_elements.length; i++) {
			if (s == this.family_elements[i].getAttribute(PROPERTY_FAMILY)) {
				this.set_family_index(i);
				break;
			}
		}
	}
	,change_content: function () {
		if (this.is_selected_word_changed()) {
			if ('' != this.word.content.value) {
				this.selected_word.innerHTML = this.conv_content_to_html(this.word.content.value);
				COVER_PHOTO.save_word();
				this.refresh_word_size();
			}
		}
	}
	,change_size: function () {
		if (this.is_selected_word_changed()) {
			this.selected_word.setAttribute(PROPERTY_SIZE, this.word.size.value);
			this.selected_word.style.fontSize = this.selected_word.getAttribute(PROPERTY_SIZE)+'px';
			COVER_PHOTO.save_word();
			this.refresh_word_size();
		}
	}
	,change_spacing: function () {
		if (this.is_selected_word_changed()) {
			this.selected_word.setAttribute(PROPERTY_SPACING, this.word.spacing.value);
			this.selected_word.style.letterSpacing = this.selected_word.getAttribute(PROPERTY_SPACING)+'px';
			COVER_PHOTO.save_word();
			this.refresh_word_size();
		}
	}
	,change_line_height: function () {
		if (this.is_selected_word_changed()) {
			this.selected_word.setAttribute(PROPERTY_LINE_HEIGHT, this.word.line_height.value);
			this.selected_word.style.lineHeight = this.selected_word.getAttribute(PROPERTY_LINE_HEIGHT)+'px';
			COVER_PHOTO.save_word();
			this.refresh_word_size();
		}
	}
	,change_bold: function (n) {
		var s = ret_button_on_or_off(n);
		if (this.is_selected_word_changed()) {
			this.selected_word.setAttribute(PROPERTY_BOLD, s);
			this.selected_word.style.fontWeight = ret_by_boolean(this.selected_word.getAttribute(PROPERTY_BOLD), 'bold', 'normal');
			COVER_PHOTO.save_word();
			this.refresh_word_size();
		}
	}
	,change_italic: function (n) {
		var s = ret_button_on_or_off(n);
		if (this.is_selected_word_changed()) {
			this.selected_word.setAttribute(PROPERTY_ITALIC, s);
			this.selected_word.style.fontStyle = ret_by_boolean(this.selected_word.getAttribute(PROPERTY_ITALIC), 'italic', 'normal');
			COVER_PHOTO.save_word();
			this.refresh_word_size();
		}
	}
	,change_align: function (n, v) {
		this.word.align.left.className = '';
		this.word.align.center.className = '';
		this.word.align.right.className = '';
		n.className = CLASS_NAME_CHECKED;
		this.word.align.value = v;
		if (this.is_selected_word_changed()) {
			this.selected_word.setAttribute(PROPERTY_H_ALIGN, this.word.align.value);
			this.selected_word.style.textAlign = this.selected_word.getAttribute(PROPERTY_H_ALIGN);
			COVER_PHOTO.save_word();
			this.refresh_word_size();
		}
	}
	,change_color: function (n) {
		this.word.color.style.color = n.value;
		if (this.is_selected_word_changed()) {
			this.selected_word.setAttribute(PROPERTY_COLOR, n.value);
			this.selected_word.style.color = this.selected_word.getAttribute(PROPERTY_COLOR);
			COVER_PHOTO.save_word();
		}
	}
	,change_shadow_color: function (n) {
		this.word.shadow.color.style.color = n.value;
		if (this.is_selected_word_changed()) {
			this.selected_word.setAttribute(PROPERTY_SHADOW_COLOR, n.value);
			this.set_shadow_property(this.selected_word);
			COVER_PHOTO.save_word();
		}
	}
	,change_background_color: function (n) {
		this.word.background.color.style.color = n.value;
		if (this.is_selected_word_changed()) {
			this.selected_word.setAttribute(PROPERTY_BACKGROUND_COLOR, n.value);
			this.set_background_property(this.selected_word);
			COVER_PHOTO.save_word();
		}
	}
	,change_background: function () {
		if (this.is_selected_word_changed()) {
			this.selected_word.setAttribute(PROPERTY_BACKGROUND_ALPHA, this.word.background.alpha.value);
			this.set_background_property(this.selected_word);
			COVER_PHOTO.save_word();
		}
	}
	,change_padding: function () {
		if (this.is_selected_word_changed()) {
			this.selected_word.setAttribute(PROPERTY_PADDING_TOP, this.word.padding.top.value);
			this.selected_word.setAttribute(PROPERTY_PADDING_RIGHT, this.word.padding.right.value);
			this.selected_word.setAttribute(PROPERTY_PADDING_BOTTOM, this.word.padding.bottom.value);
			this.selected_word.setAttribute(PROPERTY_PADDING_LEFT, this.word.padding.left.value);
			this.set_padding_property(this.selected_word);
			COVER_PHOTO.save_word();
			this.refresh_word_size();
		}
	}
	,change_border_color: function (n) {
		this.word.border.color.style.color = n.value;
		if (this.is_selected_word_changed()) {
			this.selected_word.setAttribute(PROPERTY_BORDER_COLOR, n.value);
			this.set_border_property(this.selected_word);
			COVER_PHOTO.save_word();
		}
	}
	,change_border: function () {
		if (this.is_selected_word_changed()) {
			this.selected_word.setAttribute(PROPERTY_BORDER_STYLE, this.word.border.style.value);
			this.selected_word.setAttribute(PROPERTY_BORDER_WIDTH, this.word.border.width.value);
			this.set_border_property(this.selected_word);
			COVER_PHOTO.save_word();
			this.refresh_word_size();
		}
	}
	,change_box_shadow_color: function (n) {
		this.word.box_shadow.color.style.color = n.value;
		if (this.is_selected_word_changed()) {
			this.selected_word.setAttribute(PROPERTY_BOX_SHADOW_COLOR, n.value);
			this.set_box_shadow_property(this.selected_word);
			COVER_PHOTO.save_word();
		}
	}
	,change_box_shadow: function () {
		if (this.is_selected_word_changed()) {
			this.selected_word.setAttribute(PROPERTY_BOX_SHADOW_H, this.word.box_shadow.h.value);
			this.selected_word.setAttribute(PROPERTY_BOX_SHADOW_V, this.word.box_shadow.v.value);
			this.selected_word.setAttribute(PROPERTY_BOX_SHADOW_BLUR, this.word.box_shadow.blur.value);
			this.selected_word.setAttribute(PROPERTY_BOX_SHADOW_SPREAD, this.word.box_shadow.spread.value);
			this.selected_word.setAttribute(PROPERTY_BOX_SHADOW_ALPHA, this.word.box_shadow.alpha.value);
			this.set_box_shadow_property(this.selected_word);
			COVER_PHOTO.save_word();
		}
	}
	,change_round: function () {
		if (this.is_selected_word_changed()) {
			this.selected_word.setAttribute(PROPERTY_ROUND_TOP_LEFT, this.word.round.top.left.value);
			this.selected_word.setAttribute(PROPERTY_ROUND_TOP_RIGHT, this.word.round.top.right.value);
			this.selected_word.setAttribute(PROPERTY_ROUND_BOTTOM_LEFT, this.word.round.bottom.left.value);
			this.selected_word.setAttribute(PROPERTY_ROUND_BOTTOM_RIGHT, this.word.round.bottom.right.value);
			this.set_round_property(this.selected_word);
			COVER_PHOTO.save_word();
		}
	}
	,change_shadow: function () {
		if (this.is_selected_word_changed()) {
			this.selected_word.setAttribute(PROPERTY_SHADOW_H, this.word.shadow.h.value);
			this.selected_word.setAttribute(PROPERTY_SHADOW_V, this.word.shadow.v.value);
			this.selected_word.setAttribute(PROPERTY_SHADOW_BLUR, this.word.shadow.blur.value);
			this.set_shadow_property(this.selected_word);
			COVER_PHOTO.save_word();
		}
	}
	,change_transform: function () {
		if (this.is_selected_word_changed()) {
			this.selected_word.setAttribute(PROPERTY_TRANSFORM_ROTATE, this.word.transform.rotate.value);
			this.selected_word.setAttribute(PROPERTY_TRANSFORM_SKEW_X, this.word.transform.skew.x.value);
			this.selected_word.setAttribute(PROPERTY_TRANSFORM_SKEW_Y, this.word.transform.skew.y.value);
			this.selected_word.setAttribute(PROPERTY_TRANSFORM_ORIGIN_X, this.word.transform.origin.x.value);
			this.selected_word.setAttribute(PROPERTY_TRANSFORM_ORIGIN_Y, this.word.transform.origin.y.value);
			this.set_transform_property(this.selected_word);
			COVER_PHOTO.save_word();
		}
	}
	,change_transform_mirror_h: function (n) {
		var s = ret_button_on_or_off(n);
		if (this.is_selected_word_changed()) {
			this.selected_word.setAttribute(PROPERTY_TRANSFORM_MIRROR_H, s);
			this.set_transform_property(this.selected_word);
			COVER_PHOTO.save_word();
		}
	}
	,change_transform_mirror_v: function (n) {
		var s = ret_button_on_or_off(n);
		if (this.is_selected_word_changed()) {
			this.selected_word.setAttribute(PROPERTY_TRANSFORM_MIRROR_V, s);
			this.set_transform_property(this.selected_word);
			COVER_PHOTO.save_word();
		}
	}
	,is_selected_word_changed: function () {
		this.save_word_property();
		if (this.selected_word) return true;
		return false;
	}
	,word_mouse_down: function (ev) {
		this.click_word(ev.target);
		this.grid.x = GLOBAL_PARAMETER.get_grid_x();
		this.grid.y = GLOBAL_PARAMETER.get_grid_y();
	}
	,word_mouse_up: function (ev) {
		COVER_PHOTO.save_word();
	}
	,word_mouse_move: function (ev) {
		var wordW = this.selected_word.clientWidth;
		var wordH = this.selected_word.clientHeight;
		var limitX = Math.floor(wordW / 4);
		var limitY = Math.floor(wordH / 4);
		var x = (ev.pageX - COVER_PHOTO.eleCoverContainer.parentNode.offsetLeft) - Math.floor(wordW / 2);
		var y = (ev.pageY - COVER_PHOTO.eleCoverContainer.parentNode.offsetTop) - Math.floor(wordH / 2);		
		
		if (GLOBAL_PARAMETER.is_lock_h()) {
			x = this.selected_word.offsetLeft;
		} else {
			if ((x+wordW) >= limitX) {
				if ((x+limitX) <= COVER_PHOTO.eleCoverContainer.clientWidth) {
					x = Math.floor(x / this.grid.x) * this.grid.x;
					this.selected_word.setAttribute(PROPERTY_X, x);
					this.selected_word.style.left = x+'px';
				}
			}
		}
		if (GLOBAL_PARAMETER.is_lock_v()) {
			y = this.selected_word.offsetTop;
		} else {
			if ((y+wordH) >= limitY) {
				if ((y+limitY) <= COVER_PHOTO.eleCoverContainer.clientHeight) {
					y = Math.floor(y / this.grid.y) * this.grid.y;
					this.selected_word.setAttribute(PROPERTY_Y, y);
					this.selected_word.style.top = y+'px';
				}
			}
		}
		STATUS_BAR.set_position(x, y);
	}
	,set_word_position: function (ha, va) {
		var wordW = this.selected_word.clientWidth;
		var wordH = this.selected_word.clientHeight;
		var cW = COVER_PHOTO.eleCoverContainer.clientWidth;
		var cH = COVER_PHOTO.eleCoverContainer.clientHeight;
		var x = 0;
		var y = 0;
		
		switch (ha) {
			case ALIGN_VALUE_CENTER:
				x = Math.floor((cW - wordW) / 2);
				break;
			case ALIGN_VALUE_RIGHT:
				x = cW - wordW;
				break;
		}
		switch (va) {
			case ALIGN_VALUE_CENTER:
				y = Math.floor((cH - wordH) / 2);
				break;
			case ALIGN_VALUE_BOTTOM:
				y = cH - wordH;
				break;
		}
		if (this.selected_word) {
			this.selected_word.setAttribute(PROPERTY_X, x);
			this.selected_word.setAttribute(PROPERTY_Y, y);
			this.selected_word.style.left = x+'px';
			this.selected_word.style.top = y+'px';
			COVER_PHOTO.save_word();
			STATUS_BAR.set_position(x, y);
		}
	}
	,set_no_selected_word: function () {
		if (this.selected_word) {
			this.selected_word.className = '';
			this.selected_word = null;
		}
	}
	,click_word: function (div) {
		this.set_no_selected_word();

		this.get_word_property(div);

		div.className = CLASS_NAME_FOCUS;
		this.selected_word = div;
		
		STATUS_BAR.set_position(this.selected_word.offsetLeft, this.selected_word.offsetTop)
	}
	,remove_word: function () {
		if (!this.selected_word) return;
		
		if (confirm(STR.confirm_remove_word+"\n\n"+this.selected_word.textContent)) {
			this.selected_word.parentNode.removeChild(this.selected_word);
			this.selected_word = null;
			COVER_PHOTO.save_word();
			STATUS_BAR.set_qty(COVER_PHOTO.get_word_qty());
		}
	}
	,insert_word: function () {
		var v = this.word.insert.value;
		
		if ('' == v) {
			this.word.insert.focus();
			return;
		}
		this.word.insert.value = '';
		
		div = document.createElement('div');
		div.className = CLASS_NAME_FOCUS;
		div.setAttribute(ATTRIBUTE_DRAG, DRAG_IS_WORD);
		div.innerHTML = this.conv_content_to_html(v);
		
		this.copy_word_property(div);
		this.build_word_style(div);
		this.word.content.value = v;
		COVER_PHOTO.eleCoverContainer.appendChild(div);
		COVER_PHOTO.save_word();
		
		this.set_no_selected_word();
		this.selected_word = div;
		
		STATUS_BAR.set_qty(COVER_PHOTO.get_word_qty());
	}
	,conv_content_to_html: function (s) {
		s = s.replace(/&/g, '&amp;');
		s = s.replace(/</g, '&lt;');
		s = s.replace(/>/g, '&gt;');
		s = s.replace(/\n/g, '<br>');
		return s;
	}
	,conv_html_to_content: function (s) {
		s = s.replace(/<br>/g, "\n");
		s = s.replace(/&lt;/g, '<');
		s = s.replace(/&gt;/g, '>');
		s = s.replace(/&amp;/g, '&');
		return s;
	}
	,get_word_property: function (div) {
		this.set_family_index_by_name(div.getAttribute(PROPERTY_FAMILY));
		this.word.content.value				= this.conv_html_to_content(div.innerHTML);
		this.word.size.value				= div.getAttribute(PROPERTY_SIZE);
		this.word.spacing.value				= div.getAttribute(PROPERTY_SPACING);
		this.word.line_height.value			= div.getAttribute(PROPERTY_LINE_HEIGHT);
		this.word.color.style.color			= div.getAttribute(PROPERTY_COLOR);
		set_button_status(this.word.bold			,div.getAttribute(PROPERTY_BOLD));
		set_button_status(this.word.italic			,div.getAttribute(PROPERTY_ITALIC));
		this.word.background.alpha.value		= div.getAttribute(PROPERTY_BACKGROUND_ALPHA);
		this.word.background.color.style.color		= div.getAttribute(PROPERTY_BACKGROUND_COLOR);
		this.word.padding.top.value			= div.getAttribute(PROPERTY_PADDING_TOP);
		this.word.padding.right.value			= div.getAttribute(PROPERTY_PADDING_RIGHT);
		this.word.padding.bottom.value			= div.getAttribute(PROPERTY_PADDING_BOTTOM);
		this.word.padding.left.value			= div.getAttribute(PROPERTY_PADDING_LEFT);
		this.word.border.style.value			= div.getAttribute(PROPERTY_BORDER_STYLE);
		this.word.border.width.value			= div.getAttribute(PROPERTY_BORDER_WIDTH);
		this.word.border.color.style.color		= div.getAttribute(PROPERTY_BORDER_COLOR);
		this.word.box_shadow.h.value			= div.getAttribute(PROPERTY_BOX_SHADOW_H);
		this.word.box_shadow.v.value			= div.getAttribute(PROPERTY_BOX_SHADOW_V);
		this.word.box_shadow.blur.value			= div.getAttribute(PROPERTY_BOX_SHADOW_BLUR);
		this.word.box_shadow.spread.value		= div.getAttribute(PROPERTY_BOX_SHADOW_SPREAD);
		this.word.box_shadow.alpha.value		= div.getAttribute(PROPERTY_BOX_SHADOW_ALPHA);
		this.word.box_shadow.color.style.color		= div.getAttribute(PROPERTY_BOX_SHADOW_COLOR);
		this.word.round.top.left.value			= div.getAttribute(PROPERTY_ROUND_TOP_LEFT);
		this.word.round.top.right.value			= div.getAttribute(PROPERTY_ROUND_TOP_RIGHT);
		this.word.round.bottom.left.value		= div.getAttribute(PROPERTY_ROUND_BOTTOM_LEFT);
		this.word.round.bottom.right.value		= div.getAttribute(PROPERTY_ROUND_BOTTOM_RIGHT);
		this.word.shadow.h.value			= div.getAttribute(PROPERTY_SHADOW_H);
		this.word.shadow.v.value			= div.getAttribute(PROPERTY_SHADOW_V);
		this.word.shadow.blur.value			= div.getAttribute(PROPERTY_SHADOW_BLUR);
		this.word.shadow.color.style.color		= div.getAttribute(PROPERTY_SHADOW_COLOR);
		this.word.transform.rotate.value		= div.getAttribute(PROPERTY_TRANSFORM_ROTATE);
		this.word.transform.origin.x.value		= div.getAttribute(PROPERTY_TRANSFORM_ORIGIN_X);
		this.word.transform.origin.y.value		= div.getAttribute(PROPERTY_TRANSFORM_ORIGIN_Y);
		this.word.transform.skew.x.value		= div.getAttribute(PROPERTY_TRANSFORM_SKEW_X);
		this.word.transform.skew.y.value		= div.getAttribute(PROPERTY_TRANSFORM_SKEW_Y);
		set_button_status(this.word.transform.mirror.h	,div.getAttribute(PROPERTY_TRANSFORM_MIRROR_H));
		set_button_status(this.word.transform.mirror.v	,div.getAttribute(PROPERTY_TRANSFORM_MIRROR_V));
		
		this.word.align.value				= div.getAttribute(PROPERTY_H_ALIGN)
		this.word.align.left.className = '';
		this.word.align.center.className = '';
		this.word.align.right.className = '';
		switch (this.word.align.value) {
			case ALIGN_VALUE_CENTER:
				this.word.align.center.className = CLASS_NAME_CHECKED;
				break;
			case ALIGN_VALUE_RIGHT:
				this.word.align.right.className = CLASS_NAME_CHECKED;
				break;
			default:
				this.word.align.left.className = CLASS_NAME_CHECKED;
				break;
		}
	}
	,copy_word_property: function (div) {
		div.setAttribute(PROPERTY_X			,this.word.position.default_x);
		div.setAttribute(PROPERTY_Y			,this.word.position.default_y);
		div.setAttribute(PROPERTY_FAMILY		,this.family_elements[this.family_index].getAttribute(PROPERTY_FAMILY));
		div.setAttribute(PROPERTY_SIZE			,this.word.size.value);
		div.setAttribute(PROPERTY_SPACING		,this.word.spacing.value);
		div.setAttribute(PROPERTY_LINE_HEIGHT		,this.word.line_height.value);
		div.setAttribute(PROPERTY_COLOR			,this.word.color.style.color);
		div.setAttribute(PROPERTY_BOLD			,get_button_status(this.word.bold));
		div.setAttribute(PROPERTY_ITALIC		,get_button_status(this.word.italic));
		div.setAttribute(PROPERTY_H_ALIGN		,this.word.align.value);
		div.setAttribute(PROPERTY_BACKGROUND_ALPHA	,this.word.background.alpha.value);
		div.setAttribute(PROPERTY_BACKGROUND_COLOR	,this.word.background.color.style.color);
		div.setAttribute(PROPERTY_PADDING_TOP		,this.word.padding.top.value);
		div.setAttribute(PROPERTY_PADDING_RIGHT		,this.word.padding.right.value);
		div.setAttribute(PROPERTY_PADDING_BOTTOM	,this.word.padding.bottom.value);
		div.setAttribute(PROPERTY_PADDING_LEFT		,this.word.padding.left.value);
		div.setAttribute(PROPERTY_BORDER_STYLE		,this.word.border.style.value);
		div.setAttribute(PROPERTY_BORDER_WIDTH		,this.word.border.width.value);
		div.setAttribute(PROPERTY_BORDER_COLOR		,this.word.border.color.style.color);
		div.setAttribute(PROPERTY_BOX_SHADOW_H		,this.word.box_shadow.h.value);
		div.setAttribute(PROPERTY_BOX_SHADOW_V		,this.word.box_shadow.v.value);
		div.setAttribute(PROPERTY_BOX_SHADOW_BLUR	,this.word.box_shadow.blur.value);
		div.setAttribute(PROPERTY_BOX_SHADOW_SPREAD	,this.word.box_shadow.spread.value);
		div.setAttribute(PROPERTY_BOX_SHADOW_ALPHA	,this.word.box_shadow.alpha.value);
		div.setAttribute(PROPERTY_BOX_SHADOW_COLOR	,this.word.box_shadow.color.style.color);
		div.setAttribute(PROPERTY_ROUND_TOP_LEFT	,this.word.round.top.left.value);
		div.setAttribute(PROPERTY_ROUND_TOP_RIGHT	,this.word.round.top.right.value);
		div.setAttribute(PROPERTY_ROUND_BOTTOM_LEFT	,this.word.round.bottom.left.value);
		div.setAttribute(PROPERTY_ROUND_BOTTOM_RIGHT	,this.word.round.bottom.right.value);
		div.setAttribute(PROPERTY_SHADOW_H		,this.word.shadow.h.value);
		div.setAttribute(PROPERTY_SHADOW_V		,this.word.shadow.v.value);
		div.setAttribute(PROPERTY_SHADOW_BLUR		,this.word.shadow.blur.value);
		div.setAttribute(PROPERTY_SHADOW_COLOR		,this.word.shadow.color.style.color);
		div.setAttribute(PROPERTY_TRANSFORM_ROTATE	,this.word.transform.rotate.value);
		div.setAttribute(PROPERTY_TRANSFORM_ORIGIN_X	,this.word.transform.origin.x.value);
		div.setAttribute(PROPERTY_TRANSFORM_ORIGIN_Y	,this.word.transform.origin.y.value);
		div.setAttribute(PROPERTY_TRANSFORM_SKEW_X	,this.word.transform.skew.x.value);
		div.setAttribute(PROPERTY_TRANSFORM_SKEW_Y	,this.word.transform.skew.y.value);
		div.setAttribute(PROPERTY_TRANSFORM_MIRROR_H	,get_button_status(this.word.transform.mirror.h));
		div.setAttribute(PROPERTY_TRANSFORM_MIRROR_V	,get_button_status(this.word.transform.mirror.v));
		
		this.word.position.default_x += 40;
		this.word.position.default_y += 40;
		if (this.word.position.default_x > 200) this.word.position.default_x = 40;
		if (this.word.position.default_y > 200) this.word.position.default_y = 40;
	}
	,build_word_style: function (div) {
		div.style.left					= div.getAttribute(PROPERTY_X)+'px';
		div.style.top					= div.getAttribute(PROPERTY_Y)+'px';
		div.style.fontFamily				= '"'+div.getAttribute(PROPERTY_FAMILY)+'"';
		div.style.fontSize				= div.getAttribute(PROPERTY_SIZE)+'px';
		div.style.letterSpacing				= div.getAttribute(PROPERTY_SPACING)+'px';
		div.style.lineHeight				= div.getAttribute(PROPERTY_LINE_HEIGHT)+'px';
		div.style.color					= div.getAttribute(PROPERTY_COLOR);
		div.style.fontWeight				= ret_by_boolean(div.getAttribute(PROPERTY_BOLD), 'bold', 'normal');
		div.style.fontStyle				= ret_by_boolean(div.getAttribute(PROPERTY_ITALIC), 'italic', 'normal');
		div.style.textAlign				= div.getAttribute(PROPERTY_H_ALIGN);
		this.set_shadow_property(div);
		this.set_transform_property(div);
		this.set_background_property(div);
		this.set_padding_property(div);
		this.set_border_property(div);
		this.set_box_shadow_property(div);
		this.set_round_property(div);
	}
	,set_background_property: function (div) {	
		var a = parseFloat(div.getAttribute(PROPERTY_BACKGROUND_ALPHA));
		var c = div.getAttribute(PROPERTY_BACKGROUND_COLOR);
		
		if (a > 0) {
			div.style.backgroundColor = ret_rgba_color(a, c);
		} else {
			div.style.backgroundColor = 'transparent';
		}
	}
	,set_padding_property: function (div) {
		var t = parseInt(div.getAttribute(PROPERTY_PADDING_TOP));
		var r = parseInt(div.getAttribute(PROPERTY_PADDING_RIGHT));
		var b = parseInt(div.getAttribute(PROPERTY_PADDING_BOTTOM));
		var l = parseInt(div.getAttribute(PROPERTY_PADDING_LEFT));
		
		div.style.padding = t+'px '+r+'px '+b+'px '+l+'px';
	}
	,set_border_property: function (div) {
		var s = div.getAttribute(PROPERTY_BORDER_STYLE);
		var w = parseInt(div.getAttribute(PROPERTY_BORDER_WIDTH));
		var c = div.getAttribute(PROPERTY_BORDER_COLOR);

		div.style.borderStyle = s;
		div.style.borderWidth = w+'px';
		div.style.borderColor = c;
	}
	,set_box_shadow_property: function (div) {
		var h = parseInt(div.getAttribute(PROPERTY_BOX_SHADOW_H));
		var v = parseInt(div.getAttribute(PROPERTY_BOX_SHADOW_V));
		var b = parseInt(div.getAttribute(PROPERTY_BOX_SHADOW_BLUR));
		var s = parseInt(div.getAttribute(PROPERTY_BOX_SHADOW_SPREAD));
		var a = parseFloat(div.getAttribute(PROPERTY_BOX_SHADOW_ALPHA));
		var c = div.getAttribute(PROPERTY_BOX_SHADOW_COLOR);
		
		if ((0 != h) || (0 != v) || (0 != b)) {
			if (1 > a) c = ret_rgba_color(a, c);
			div.style.boxShadow = h+'px '+v+'px '+b+'px '+s+'px '+c;
		} else {
			div.style.boxShadow = 'none';
		}
	}
	,set_round_property: function (div) {
		var tl = parseInt(div.getAttribute(PROPERTY_ROUND_TOP_LEFT));
		var tr = parseInt(div.getAttribute(PROPERTY_ROUND_TOP_RIGHT));
		var bl = parseInt(div.getAttribute(PROPERTY_ROUND_BOTTOM_LEFT));
		var br = parseInt(div.getAttribute(PROPERTY_ROUND_BOTTOM_RIGHT));
		
		div.style.borderRadius = tl+'px '+tr+'px '+bl+'px '+br+'px';
	}
	,set_shadow_property: function (div) {
		var h = parseInt(div.getAttribute(PROPERTY_SHADOW_H));
		var v = parseInt(div.getAttribute(PROPERTY_SHADOW_V));
		var b = parseInt(div.getAttribute(PROPERTY_SHADOW_BLUR));
		var c = div.getAttribute(PROPERTY_SHADOW_COLOR);
		
		if ((0 != h) || (0 != v) || (0 != b)) {
			div.style.textShadow = h+'px '+v+'px '+b+'px '+c;
		} else {
			div.style.textShadow = 'none';
		}
	}
	,set_transform_property: function (div) {
		var r = parseInt(div.getAttribute(PROPERTY_TRANSFORM_ROTATE));
		var ox = parseInt(div.getAttribute(PROPERTY_TRANSFORM_ORIGIN_X));
		var oy = parseInt(div.getAttribute(PROPERTY_TRANSFORM_ORIGIN_Y));
		var sx = parseInt(div.getAttribute(PROPERTY_TRANSFORM_SKEW_X));
		var sy = parseInt(div.getAttribute(PROPERTY_TRANSFORM_SKEW_Y));
		var mh = ('1' == div.getAttribute(PROPERTY_TRANSFORM_MIRROR_H));
		var mv = ('1' == div.getAttribute(PROPERTY_TRANSFORM_MIRROR_V));
		var tf = [];
		var a = 0;
		
		if (0 != r) {
			tf[a] = 'rotate('+r+'deg)';		a++;
		}
		if (0 != sx) {
			tf[a] = 'skewX('+sx+'deg)';		a++;
		}
		if (0 != sy) {
			tf[a] = 'skewY('+sy+'deg)';		a++;
		}
		if (mh) {
			tf[a] = 'scaleX(-1)';			a++;
		}
		if (mv) {
			tf[a] = 'scaleY(-1)';			a++;
		}
		if (a > 0) {
			div.style.transform = tf.join(' ');
		} else {
			div.style.transform = 'none';
		}
		div.style.transformOrigin = ox+'% '+oy+'%';
	}
	,load_word_property: function () {
		var s = get_local_data(STORAGE_WORD_PROPERTY);
		var wps;
		
		if ('' == s) return;
		
		wps = JSON.parse(s);
		
		this.set_family_index_by_name(wps[PROPERTY_FAMILY]);
		this.word.size.value				= wps[PROPERTY_SIZE];
		this.word.spacing.value				= wps[PROPERTY_SPACING];
		this.word.line_height.value			= wps[PROPERTY_LINE_HEIGHT];
		this.word.color.style.color			= wps[PROPERTY_COLOR];
		set_button_status(this.word.bold			,wps[PROPERTY_BOLD]);
		set_button_status(this.word.italic			,wps[PROPERTY_ITALIC]);
		this.word.background.alpha.value		= wps[PROPERTY_BACKGROUND_ALPHA];
		this.word.background.color.style.color		= wps[PROPERTY_BACKGROUND_COLOR];
		this.word.padding.top.value			= wps[PROPERTY_PADDING_TOP];
		this.word.padding.right.value			= wps[PROPERTY_PADDING_RIGHT];
		this.word.padding.bottom.value			= wps[PROPERTY_PADDING_BOTTOM];
		this.word.padding.left.value			= wps[PROPERTY_PADDING_LEFT];
		this.word.border.style.value			= wps[PROPERTY_BORDER_STYLE];
		this.word.border.width.value			= wps[PROPERTY_BORDER_WIDTH];
		this.word.border.color.style.color		= wps[PROPERTY_BORDER_COLOR];
		this.word.box_shadow.h.value			= wps[PROPERTY_BOX_SHADOW_H];
		this.word.box_shadow.v.value			= wps[PROPERTY_BOX_SHADOW_V];
		this.word.box_shadow.blur.value			= wps[PROPERTY_BOX_SHADOW_BLUR];
		this.word.box_shadow.spread.value		= wps[PROPERTY_BOX_SHADOW_SPREAD];
		this.word.box_shadow.alpha.value		= wps[PROPERTY_BOX_SHADOW_ALPHA];
		this.word.box_shadow.color.style.color		= wps[PROPERTY_BOX_SHADOW_COLOR];
		this.word.round.top.left.value			= wps[PROPERTY_ROUND_TOP_LEFT];
		this.word.round.top.right.value			= wps[PROPERTY_ROUND_TOP_RIGHT];
		this.word.round.bottom.left.value		= wps[PROPERTY_ROUND_BOTTOM_LEFT];
		this.word.round.bottom.right.value		= wps[PROPERTY_ROUND_BOTTOM_RIGHT];
		this.word.shadow.h.value			= wps[PROPERTY_SHADOW_H];
		this.word.shadow.v.value			= wps[PROPERTY_SHADOW_V];
		this.word.shadow.blur.value			= wps[PROPERTY_SHADOW_BLUR];
		this.word.shadow.color.style.color		= wps[PROPERTY_SHADOW_COLOR];
		this.word.transform.rotate.value		= wps[PROPERTY_TRANSFORM_ROTATE];
		this.word.transform.origin.x.value		= wps[PROPERTY_TRANSFORM_ORIGIN_X];
		this.word.transform.origin.y.value		= wps[PROPERTY_TRANSFORM_ORIGIN_Y];
		this.word.transform.skew.x.value		= wps[PROPERTY_TRANSFORM_SKEW_X];
		this.word.transform.skew.y.value		= wps[PROPERTY_TRANSFORM_SKEW_Y];
		set_button_status(this.word.transform.mirror.h		,wps[PROPERTY_TRANSFORM_MIRROR_H]);
		set_button_status(this.word.transform.mirror.v		,wps[PROPERTY_TRANSFORM_MIRROR_V]);
		
		this.word.align.value				= wps[PROPERTY_H_ALIGN]
		this.word.align.left.className = '';
		this.word.align.center.className = '';
		this.word.align.right.className = '';
		switch (this.word.align.value) {
			case ALIGN_VALUE_CENTER:
				this.word.align.center.className = CLASS_NAME_CHECKED;
				break;
			case ALIGN_VALUE_RIGHT:
				this.word.align.right.className = CLASS_NAME_CHECKED;
				break;
			default:
				this.word.align.left.className = CLASS_NAME_CHECKED;
				break;
		}
	}
	,save_word_property: function () {
		var wps = {};
		
		wps[PROPERTY_FAMILY]			= this.family_elements[this.family_index].getAttribute(PROPERTY_FAMILY);
		wps[PROPERTY_SIZE]			= this.word.size.value;
		wps[PROPERTY_SPACING]			= this.word.spacing.value;
		wps[PROPERTY_LINE_HEIGHT]		= this.word.line_height.value;
		wps[PROPERTY_COLOR]			= this.word.color.style.color;
		wps[PROPERTY_BOLD]			= get_button_status(this.word.bold);
		wps[PROPERTY_ITALIC]			= get_button_status(this.word.italic);
		wps[PROPERTY_H_ALIGN]			= this.word.align.value;
		wps[PROPERTY_BACKGROUND_ALPHA]		= this.word.background.alpha.value;
		wps[PROPERTY_BACKGROUND_COLOR]		= this.word.background.color.style.color;
		wps[PROPERTY_PADDING_TOP]		= this.word.padding.top.value;
		wps[PROPERTY_PADDING_RIGHT]		= this.word.padding.right.value;
		wps[PROPERTY_PADDING_BOTTOM]		= this.word.padding.bottom.value;
		wps[PROPERTY_PADDING_LEFT]		= this.word.padding.left.value;
		wps[PROPERTY_BORDER_STYLE]		= this.word.border.style.value;
		wps[PROPERTY_BORDER_WIDTH]		= this.word.border.width.value;
		wps[PROPERTY_BORDER_COLOR]		= this.word.border.color.style.color;
		wps[PROPERTY_BOX_SHADOW_H]		= this.word.box_shadow.h.value;
		wps[PROPERTY_BOX_SHADOW_V]		= this.word.box_shadow.v.value;
		wps[PROPERTY_BOX_SHADOW_BLUR]		= this.word.box_shadow.blur.value;
		wps[PROPERTY_BOX_SHADOW_SPREAD]		= this.word.box_shadow.spread.value;
		wps[PROPERTY_BOX_SHADOW_ALPHA]		= this.word.box_shadow.alpha.value;
		wps[PROPERTY_BOX_SHADOW_COLOR]		= this.word.box_shadow.color.style.color;
		wps[PROPERTY_ROUND_TOP_LEFT]		= this.word.round.top.left.value;
		wps[PROPERTY_ROUND_TOP_RIGHT]		= this.word.round.top.right.value;
		wps[PROPERTY_ROUND_BOTTOM_LEFT]		= this.word.round.bottom.left.value;
		wps[PROPERTY_ROUND_BOTTOM_RIGHT]	= this.word.round.bottom.right.value;
		wps[PROPERTY_SHADOW_H]			= this.word.shadow.h.value;
		wps[PROPERTY_SHADOW_V]			= this.word.shadow.v.value;
		wps[PROPERTY_SHADOW_BLUR]		= this.word.shadow.blur.value;
		wps[PROPERTY_SHADOW_COLOR]		= this.word.shadow.color.style.color;
		wps[PROPERTY_TRANSFORM_ROTATE]		= this.word.transform.rotate.value;
		wps[PROPERTY_TRANSFORM_ORIGIN_X]	= this.word.transform.origin.x.value;
		wps[PROPERTY_TRANSFORM_ORIGIN_Y]	= this.word.transform.origin.y.value;
		wps[PROPERTY_TRANSFORM_SKEW_X]		= this.word.transform.skew.x.value;
		wps[PROPERTY_TRANSFORM_SKEW_Y]		= this.word.transform.skew.y.value;
		wps[PROPERTY_TRANSFORM_MIRROR_H]	= get_button_status(this.word.transform.mirror.h);
		wps[PROPERTY_TRANSFORM_MIRROR_V]	= get_button_status(this.word.transform.mirror.v);
		set_local_data(STORAGE_WORD_PROPERTY, JSON.stringify(wps));
	}
	,refresh_word_size: function () {
		STATUS_BAR.set_size(this.selected_word.clientWidth, this.selected_word.clientHeight);
	}
};

var STATUS_BAR = {
	container: null
	,eleQty: null
	,elePosition : null
	,eleSize: null
	,eleProfilePhoto: null
	,init: function () {
		this.container			= document.getElementById('status-bar');
		this.eleQty			= document.getElementById('info-qty');
		this.elePosition		= document.getElementById('info-position');
		this.eleSize			= document.getElementById('info-size');
		this.eleProfilePhoto		= document.getElementById('global-profile-photo');
	}
	,show: function () {
		this.container.className = '';
	}
	,hide: function () {
		this.container.className = CLASS_NAME_HIDE;
	}
	,set_qty: function (v) {
		this.eleQty.textContent = STR.status_qty+': '+v;
	}
	,set_position: function (x, y) {
		this.elePosition.textContent = STR.status_position+': '+x+', '+y;
	}
	,set_size: function (w, h) {
		this.eleSize.textContent = STR.status_size+': '+w+'x'+h;
	}
	,set_profile_photo_checked: function (b) {
		this.set_checked(this.eleProfilePhoto, b);
	}
	,set_checked: function (n, b) {
		if (b) {
			n.className = CLASS_NAME_CHECKED;
		} else {
			n.className = '';
		}
	}
};

var FAMILY_EDITOR = {
	list: []
	,eleList: null
	,eleDemo: null
	,init: function () {
		this.eleList = document.getElementById('family-list');
		this.eleDemo = document.getElementById('family-demo');
		
		this.load_family();
	}
	,load_family: function () {
		var s = get_local_data(STORAGE_FAMILY);
		var fps;
		
		if ('' == s) {
			this.list		= STR.default_family;
			this.eleDemo.value	= STR.default_family_demo;
			this.eleList.value	= this.list.join("\n");
			return;
		}
		
		fps = JSON.parse(s);

		this.list		= fps[PROPERTY_FAMILY_LIST];
		this.eleDemo.value	= fps[PROPERTY_FAMILY_DEMO];
		this.eleList.value	= this.list.join("\n");
	}
	,save_family: function () {
		var fps = {};

		fps[PROPERTY_FAMILY_LIST]	= this.list;
		fps[PROPERTY_FAMILY_DEMO]	= this.eleDemo.value;

		set_local_data(STORAGE_FAMILY, JSON.stringify(fps));
	}
	,get_qty: function () {
		return this.list.length;
	}
	,get_name: function (i) {
		if (i < this.list.length) return this.list[i];
		return '';
	}
	,get_demo: function () {
		return this.eleDemo.value;
	}
	,save_data: function () {
		var fs;
		var ls = [];
		var i;
		var c = 0;
	
		if ('' == this.eleList.value) return;
		if ('' == this.eleDemo.value) return;
		
		fs = this.eleList.value.split("\n");
		for (i=0; i<fs.length; i++) {
			if ('' != fs[i]) {
				ls[c] = fs[i];
				c++;
			}
		}
		if (c > 0) {
			this.list = ls;
			this.save_family();
			FONT_OP.rebuild_family();
			alert(STR.done_save_family);
		}
	}
};

function preview_photo(i, t) {
	var g = document.getElementById(t);
	
	if (!g) return;
	
	g.src = i.value;
}

function show_picked_color(n) {
	n.nextSibling.style.color = n.value;
}

function show_color_picker(n) {
	n.previousSibling.click();
}

function ret_blob_from_url(s, mt) {
	var bf;
	var bfv;
	var i;
	
	s = unescape(encodeURIComponent(s));

	bf = new ArrayBuffer(s.length);
	bfv = new Uint8Array(bf);
	for (i=0; i<s.length; i++) {
		bfv[i] = s.charCodeAt(i);
	}
	return new Blob([bf],{type: mt+';charset=utf-8'});
}

function ret_rgba_color(a, c) {
	var hex = '0123456789ABCDEF';
	var v = [204, 204, 204];
		
	switch (c.charAt(0)) {
		case '#':
			c = c.toUpperCase();
			v[0] = hex.indexOf(c.charAt(1));
			v[0] <<= 4;
			v[0] |= hex.indexOf(c.charAt(2));
			v[1] = hex.indexOf(c.charAt(3));
			v[1] <<= 4;
			v[1] |= hex.indexOf(c.charAt(4));
			v[2] = hex.indexOf(c.charAt(5));
			v[2] <<= 4;
			v[2] |= hex.indexOf(c.charAt(6));
			break;
		case 'r':
			v = c.match(/\d{1,3}/g);
			break;
	}
	v[3] = a;
	return 'rgba('+v.join(', ')+')';
}

function ret_by_boolean(b, ts, fs) {
	if ('1' == b) return ts;
	return fs;
}

function get_local_data(k) {
	var d =  localStorage.getItem('fb-cover-word-'+k);
	
	if ('string' != typeof d) return '';
	return d;
}

function get_local_data_int(k) {
	var d = localStorage.getItem('fb-cover-word-'+k);
	
	if ('string' != typeof d) return 0;
	return parseInt(d);
}

function get_local_data_float(k) {
	var d = localStorage.getItem('fb-cover-word-'+k);
	
	if ('string' != typeof d) return 0.0;
	return parseFloat(d);
}

function set_local_data(k, v) {
	localStorage.setItem('fb-cover-word-'+k, v.toString());
}

function safe_get_node_attribute(n, a) {
	if (!n.hasAttribute(a)) return '';
	return n.getAttribute(a);
}

function insert_node_class(n, c) {
	n.className += ' '+c;
}

function remove_node_class(n, c) {
	n.className = n.className.replace(' '+c, '');
}

function is_node_has_class(n, c) {
	return (-1 != n.className.indexOf(c));
}

function ret_button_on_or_off(n) {
	if (CLASS_NAME_CHECKED == n.className) {
		n.className = '';
		return '0';
	} else {
		n.className = CLASS_NAME_CHECKED;
		return '1';
	}
}
function get_button_status(n) {
	if (CLASS_NAME_CHECKED == n.className) return '1';
	return '0';
}
function set_button_status(n, b) {
	if ('1' == b) {
		n.className = CLASS_NAME_CHECKED;
	} else {
		n.className = '';
	}
}
	
function init_page() {
	GLOBAL_PARAMETER.init();
	STATUS_BAR.init();
	RIBBON_BAR.init();
	FAMILY_EDITOR.init();
	COVER_PHOTO.init();
	FONT_OP.init();
	FONT_OP.rebuild_family();
}


window.onload = init_page;
document.onmousedown = DRAG_CONTROLL.down;
document.onmouseup = DRAG_CONTROLL.up;
