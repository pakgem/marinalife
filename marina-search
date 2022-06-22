  var Webflow = Webflow || [];
  Webflow.push(function() {
    var l = $('#custom-hero-slider .w-slider-arrow-left');
    var r = $('#custom-hero-slider .w-slider-arrow-right');
    $('#custom-hero-slider')
      .on('click', '.slider-left', function() {
        l.trigger('tap');
      })
      .on('click', '.slider-right', function() {
        r.trigger('tap');
      });
  });

<script src="https://cdn.jsdelivr.net/npm/algoliasearch@4.5.1/dist/algoliasearch-lite.umd.js" integrity="sha256-EXPXz4W6pQgfYY3yTpnDa3OH8/EPn16ciVsPQ/ypsjk=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/instantsearch.js@4.8.3/dist/instantsearch.production.min.js" integrity="sha256-LAGhRRdtVoD6RLo2qDQsU2mp+XVSciKRC8XPOBWmofM=" crossorigin="anonymous"></script>

	var search = instantsearch({
    searchClient: algoliasearch('70H8CY4ZEE', 'ebb2e4d36e27f20d4e1d6b237243c8dd'),
    indexName: 'marina_profiles'
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#searchbox',
      placeholder: 'Search for marinas',
      queryHook(query, search) {
        search(query);
        $('.marina-filter-wrapper').show();
      },
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#amenities',
      limit: 10,
      showMore: true,
      showMoreLimit: 30,
      operator: 'and',
      attribute: 'amenities',
    })
  );

  search.addWidget(
    instantsearch.widgets.pagination({
      container: '#pagination',
    })
  );

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        item: `
<a href="/marina?slug={{slug}}" class="marina-card_component margin-bottom-40">
  <div class="marina-card-top">
    <div class="marina-card-title">{{title}}</div>
    <img src="https://global-uploads.webflow.com/6235eea516e120236bb14451/62843d309c7d1e2a23714f85_Generic%20Marina%20Hero.jpg" loading="lazy" class="marina-card-image">
    <img src="{{image_featured}}" loading="lazy" onError="this.onerror = '';this.style.visibility='hidden';" class="marina-card-image">
    <div class="dark-overlay"></div>
  </div>
  <div class="marina-card-bottom">
    <div class="marina-flex">
      <div class="left-marina-flex">
        <div class="marina-card-line">
          <div class="marina-card-number">{{phone}}</div>
        </div>
        <div class="marina-card-line">
          <div class="marina-card-address">{{city}}, {{state}}</div>
          <div class="marina-card-address-hidden-field">{{city}}{{state}}</div>
        </div>
      </div>
      <div class="right-marina-flex hide-on-mobile">
        <div class="card-tag advertise"><img src="https://global-uploads.webflow.com/6235eea516e120236bb14451/625f0875d946be34bfd88f79_MarinaLife%20Icon_Round%402x.png" loading="lazy" width="23" alt="" class="marina-logo">
          <div class="card-text">Marinalife Partner</div>
          <div class="advertise-hidden-field">{{advertiser}}</div>
        </div>
        <div class="card-tag discounts">
          <div class="discount-wrap">$</div>
          <div class="card-text">Discounts Available</div>
          <div class="discount-hidden-field">{{member_discount}}</div>
        </div>
      </div>
    </div>
    <div class="marina-details">
      <div class="marina-details-content-wrap">
        <div class="marina-details-content">
          <h5 class="marina-details-header">Max<br>Length: </h5>
          <div class="marina-value max-length">{{max_boat_length}}</div>
        </div>
        <div class="marina-details-content">
          <h5 class="marina-details-header">Approach<br>Depth:&nbsp;</h5>
          <div class="marina-value approach-depth">{{approach_depth}}</div>
        </div>
        <div class="marina-details-content bottom-margin-20">
          <h5 class="marina-details-header">Dock<br>Depth: </h5>
          <div class="marina-value dock-depth">{{dock_depth}}</div>
        </div>
        <div class="marina-details-content-hidden-field">{{max_boat_length}}{{approach_depth}}{{dock_depth}}</div>
      </div>
      <div class="card-tag show-on-mobile"><img src="https://global-uploads.webflow.com/6235eea516e120236bb14451/625f0875d946be34bfd88f79_MarinaLife%20Icon_Round%402x.png" loading="lazy" width="23" alt="" class="marina-logo">
        <div class="card-text">Marinalife Partner</div>
        <div class="advertise-hidden-field">{{advertiser}}</div>
      </div>
      <div class="card-tag show-on-mobile">
        <div class="discount-wrap">$</div>
        <div class="card-text">Discounts Available</div>
        <div class="discount-hidden-field">{{member_discount}}</div>
      </div><div class="button marina-card-button w-button">View Marina Details</div>
    </div>
  </div>
</a>
    `,
      empty: `
      <div class="empty-results"><div class="top-empty-result-line">Looks like we can’t find any marinas or locations that match that criteria. To get your search in ship shape, try changing your search or filter choices. You can also search for a nearby location or another marina name.</div><div class="bottom-empty-result-line">If you need help, hail us on our live chat or at <a href="mailto:info@marinalife.com">info@marinalife.com</a><br></div></div>
       `
     },
    })
  );

  search.start();

  search.on('render', () => {
  	$('.advertise-hidden-field').each(function( index ) {
    		if($(this).text() == "FALSE"){
					$(this).parent().hide();
				}
		});
    $('.advertise-hidden-field:empty').parent().hide();
    $('.discount-hidden-field:empty').parent().hide();
    $('.max-length:empty').parent().remove();
    $('.approach-depth:empty').parent().remove();
    $('.dock-depth:empty').parent().remove();
    $('.marina-card-address-hidden-field:empty').parent().remove();
    $('.marina-details-content-hidden-field:empty').parent().remove();
  });

