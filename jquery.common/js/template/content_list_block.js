// ----------------------------------------------------------------------------
// Table Of Content
//
// Functions
// Page Sections
// ----------------------------------------------------------------------------


// ----------------------------------------------------------------------------
// Functions
// ----------------------------------------------------------------------------
// --------------------------------------
// Content List Block
// --------------------------------------
/**
 * Content List Block ajax process
 * @param {array} data
 */
$.ajax({
  url: '/jquery.common/js/template/content_list_block.json',
  type: 'GET',
  dataType: 'json',
}).done(function (data) {

  append_block_content(data);
});

/**
 * Append Content List Block
 * @param {array} data
 */
function append_block_content(data){

  let items_html = get_content_list_items(data);

  if(items_html !== ''){
    let $html = $('<div class="content_items">' + items_html + '</div>');

    $block_content = $('#content_dog');
    $block_content.append($html);

    while (true) {

      if($block_content.find($html).length > 0){

        $block_content.animate({
          'opacity' : 1
        }, 300).trigger('appended');

        break;
      }
    }
  }
}

/**
 * Get Content List Block Items
 * @param {array} data
 * @return {string} html
 */
function get_content_list_items(data){
  let html = '';

  $.each(data, function(index, value){
    html += '<div class="content_item" data-modal-canvas="#modal_canvas" data-modal-content-id="' + index + '">';
      html += '<div class="item_thumb"><img src="/jquery.common/img/' + value['thumb'] + '" alt="' + value['name'] + '"></div>';
      html += '<p class="item_name">' + value['name'] + '</p>';
    html += '</div>';
  });

  return html;
}
