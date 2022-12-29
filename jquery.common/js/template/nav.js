// ----------------------------------------------------------------------------
// Menu Array
// ----------------------------------------------------------------------------
// --------------------------------------
// Menu Git
// --------------------------------------
/**
 * @return {object} Menu array
 */
let menu_global_array = {
  git : function(){
    /**
     * @param {string} handle ハンドル名:(※サブメニューにハンドル名は必要なし)
     * @param {string} ttl リンク文字列
     * @param {string} url リンクURL ※無い場合キーを追加しない
     * @param {bool} target_blank target="_blank"真偽 ※urlキーが無い場合キーを追加しない
     * @param {object} sub_menu サブメニュー配列 ※無い場合キーを追加しない
     */
    return [
      {
        'handle' : 'git',
        'text' : 'Git Repository',
        'sub_menu' : [
          {
            'text' : 'jquery.modal',
            'url' : '/myjQueryUI/jquery.modal',
            'target' : '_blank'
          }
        ]
      }
    ];
  }
};


// --------------------------------------
// Menu Repository
// --------------------------------------
/**
 * 指定セレクタにメニューHTMLを追加
 * @param {object} arg HTML追加情報
 */
function add_html_menu(arg) {

  $.each(arg, function(){

    let menu = this.menu;
    if(this.menu_rule.length >= 1){
      menu = filter_sort_menu(
        this.menu,
        this.menu_rule
      );
    }

    $(this.selector).append(
      get_html_menu(menu, this.sub, this.add_class)
    );
  });
}

/**
 * 指定セレクタにサブメニューHTMLを追加
 * @param {object} arg HTML追加情報
 */
function add_html_menu_sub(arg){

  $.each(arg, function(){
    let self = this;

    //サブメニューをハンドル名でフィルタリング抽出
    let filtered_arr = this.menu.filter( function (arr) {
      return arr.handle == self.handle;
    })

    $(this.selector).append(
      get_html_sub_menu(filtered_arr[0].sub_menu)
    );
  });
}

/**
 * メニュー追加
 * @param {object} menu メニュー配列
 * @param {bool} sub サブメニュー真偽
 */
function get_html_menu(menu, sub = true, add_class = '') {
  let html = '';

  html += '<ul class="main_menu';
  if(add_class != '') html += ' ' + add_class;
  html += '">';
  $.each(menu, function(){

    if(!is_allow_list_substitution(this, sub)){
      return;
    }

    html += '<li class="menu_item">' + get_html_list_inner(this);

    if(sub && typeof this.sub_menu){
      html += get_html_sub_menu(this.sub_menu);
    }

    html += '</li>';
  });
  html += '</ul>';

  return html;
}

/**
 * リストアイテムHTML代入許可
 * @condition URLなし・サブメニュー偽
 * @condition URLなし・サブメニュー真・サブメニュー無し
 * @param {object} list リストオブジェクト
 * @param {bool} sub サブメニュー真偽
 * @return {bool} HTML代入許可
 */
function is_allow_list_substitution(list, sub){
  if(
    typeof list.url === "undefined" && sub === false
    || typeof list.url === "undefined" &&  sub === true && typeof list.sub_menu === "undefined"
  ){
    return false;
  }

  return true;
}

/**
 * サブメニューリストHTML取得
 * @param {object} sub_menu サブメニューリストオブジェクト
 * @returns サブメニューリストHTML
 */
function get_html_sub_menu(sub_menu) {
  let html = '';

  html += '<ul class="sub_menu">';
  $.each(sub_menu, function(){

    html += '<li class="menu_item">' + get_html_list_inner(this) + '</li>';

  });
  html += '</ul>';

  return html;
}

/**
 * メニューリストHTML取得
 * @param {object} list メニューリストオブジェクト
 * @returns {string} メニューリストHTML
 */
function get_html_list_inner(list) {
  if(typeof list.url === "undefined"){
    return '<span class="item_inner">' + list.ttl + '</span>';
  }

  let target_blank = list.target_blank?
    ' target="_blank"' : '';

  return '<a href="' + list.url + '"' + target_blank + ' class="item_inner">' + list.ttl + '</a>';
}

/**
 * フィルター・ソートされたメニュー配列を返す
 * @param {object} menu_items メニュー配列
 * @param {object} menu_rule フィルター・ソートルール
 * @return {object} フィルター・ソートされたメニュー配列
 */
function filter_sort_menu(menu_items, menu_rule){

  menu_items = menu_items.filter(function(menu_item){
    if(menu_rule.indexOf(menu_item.handle) !== -1){
      return true;
    }

    return false;
  });

  menu_items.sort(function(a, b){
    let a_key, b_key;

    for (let i = 0; i < menu_rule.length; i++) {
      if (menu_rule[i] === a.handle) {
        a_key = i;
      }

      if (menu_rule[i] === b.handle) {
        b_key = i;
      }
    }

    if(a_key < b_key) return -1;
    if(a_key > b_key) return 1;
    return 0;
  });

  return menu_items;
}
