// Make the original variant selector update the generated option selectors
// we are not doing this on a trigger event because if we did we'd end up in recursive hell
Bsify.update_product_selector_options = function ($product_selector) {
  
  // get the selected variant object
  var variant_id = $product_selector.val();
  var variant = Bsify.get_variant_by_id(variant_id);
  
  if (variant) {
    // update each option selector
    for (var i = 0; i < Bsify.product.options.length; i++) {
      var option = 'option'+(i+1);
      var value = variant[option];
      $('.single-option-selector:eq('+i+')').val(value).trigger('change');
    }
  }
};

// Switch the variant if the gallery thumb is linked to one
Bsify.image_variant_switcher = function () {
  var $product_selector = $(Bsify.product_select_selector);
  $(document).on('click', '[data-variant-id]', function (e) {
    e.preventDefault();
    var $current_target = $(e.currentTarget);
    // update the product selector with the new variant id
    $product_selector.val($current_target.data('variant-id'));
    // update the option selectors
    Bsify.update_product_selector_options($product_selector);
  });
};

if (Bsify.product) {
  // Initialise the image_variant_switcher
  Bsify.image_variant_switcher();
}