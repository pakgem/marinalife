  // if the page url has a query string
  if (window.location.search) {
    // get all url search params from the query string
    const urlParams = new URLSearchParams(window.location.search);
    // get the value of the search param
    var searchTerm = urlParams.get('slug');
    // Create a request variable and assign a new XMLHttpRequest object to it.
    request = new XMLHttpRequest()
    let marinaUrl = new URL('https://zzftxmm4b66igiuxj2bxk2vln40rbcfv.lambda-url.us-east-1.on.aws/?slug=' + searchTerm);
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', marinaUrl.toString(), true)
    request.onload = function() {
      var data = JSON.parse(this.response)
      if (request.status >= 200 && request.status < 400) {
        var source = data.Items[0];
        const lat = source.lat;
        const lng = source.lng;
        const LatLng = lat + ',' + lng;
        const client = algoliasearch('70H8CY4ZEE', 'ebb2e4d36e27f20d4e1d6b237243c8dd');
        const index = client.initIndex('marina_profiles');
        // only query string
        index.search('', {
          aroundLatLng: LatLng,
          aroundRadius: 100000,
          hitsPerPage: 3,
        }).then(({
          hits
        }) => {
        // populate nearby marinas, excluding itself
          var m1 = hits[1];
          var m2 = hits[2];
          if (!m1) {
            $("#marina-card-1").hide();
          } else {
            // Nearby Marina 1
            if (m1.image_featured) {
              $("#marina-card-image-1").removeAttr("srcset");
              $("#marina-card-image-1").attr("src", m1.image_featured);
            }
            $("#marina-card-title-1").text((m1.title) ? m1.title : "");
            $("#marina-card-number-1").text((m1.phone) ? m1.phone : "");
            $("#marina-card-city-1").text((m1.city) ? m1.city : "");
            $("#marina-card-state-1").text((m1.state) ? m1.state : "");
            if (!m1.advertiser || m1.advertiser == "FALSE") {
              $("#advertiser-1").hide();
            }
            if (!m1.has_discount) {
              $("#discount-tag-1").hide();
            }
            if (!m1.max_boat_length) {
              $("#max-length-container-1").hide();
            } else {
              $("#max-length-1").text(m1.max_boat_length);
            }
            if (!m1.approach_depth) {
              $("#approach-depth-container-1").hide();
            } else {
              $("#approach-depth-1").text(m1.approach_depth);
            }
            if (!m1.dock_depth) {
              $("#dock-depth-container-1").hide();
            } else {
              $("#dock-depth-1").text(m1.dock_depth);
            }
            if (!m1.max_boat_length && !m1.approach_depth && !m1.dock_depth) {
              $('#marina-details-content-wrap-1').hide();
            }
            $("#marina-card-1").attr("href", "/marina?slug=" + m1.slug);
          }
          // Nearby Marina 2
          if (!m2) {
            $("#marina-card-2").hide();
          } else {
            if (m2.image_featured) {
              $("#marina-card-image-2").removeAttr("srcset");
              $("#marina-card-image-2").attr("src", m2.image_featured);
            }
            $("#marina-card-title-2").text((m2.title) ? m2.title : "");
            $("#marina-card-number-2").text((m2.phone) ? m2.phone : "");
            $("#marina-card-city-2").text((m2.city) ? m2.city : "");
            $("#marina-card-state-2").text((m2.state) ? m2.state : "");
            if (!m2.advertiser || m2.advertiser == "FALSE") {
              $("#advertiser-2").hide();
            }
            if (!m2.has_discount) {
              $("#discount-tag-2").hide();
            }
            if (!m2.max_boat_length) {
              $("#max-length-container-2").hide();
            } else {
              $("#max-length-2").text(m2.max_boat_length);
            }
            if (!m2.approach_depth) {
              $("#approach-depth-container-2").hide();
            } else {
              $("#approach-depth-2").text(m2.approach_depth);
            }
            if (!m2.dock_depth) {
              $("#dock-depth-container-2").hide();
            } else {
              $("#dock-depth-2").text(m2.dock_depth);
            }
            if (!m2.max_boat_length && !m2.approach_depth && !m2.dock_depth) {
              $('#marina-details-content-wrap-2').hide();
            }
            $("#marina-card-2").attr("href", "/marina?slug=" + m2.slug);
          }
          if($("#marina-card-2").is(":hidden") && $("#marina-card-2").is(":hidden")){
						$(".nearby-marina-title").hide();
					}
        });
        $("#hero-title").text((source.title) ? source.title : "");
        $("#hero-state").text((source.state) ? source.state : "");
        $("#hero-city").text((source.city) ? source.city : "");
        if (source.image_featured) {
          $("#hero-image").removeAttr("srcset");
          $("#hero-image").attr("src", source.image_featured);
        }
        $("#phone-number").text((source.phone) ? source.phone : "");
        $(".marina-contact-address1").text((source.address_1) ? source.address_1 : "");
        $(".marina-contact-address2").text((source.address_2) ? source.address_2 : "");
        $(".marina-contact-city").text((source.city) ? source.city : "");
        $(".marina-contact-state").text((source.state) ? source.state : "");
        $(".marina-contact-zip").text((source.text_zipcode) ? source.text_zipcode : "");
        if (source.website) {
          var prefix = 'http://';
          if (source.website.substr(0, prefix.length) !== prefix) {
            source.website = prefix + source.website;
          }
          $("#marina-contact-site-link").attr("href", source.website);
        } else {
          $("#marina-contact-site-link").hide();
        }
        if (!source.phone && !source.text_address && !source.website) {
          $(".marina-contact-info").hide();
        }
        if (!source.advertiser || source.advertiser == "FALSE") {
          $("#advertiser").hide();
        }
        $("#discount-text").text((source.member_discount) ? source.member_discount : "");
        if (!source.has_discount) {
          $("#has-discount").hide();
        }
        if (!source.images) {
          $("#image-slider").hide();
          $(".marina-slider-image").hide();
        } else {
          $('.splide__list').empty();
          var images = source.images;
          if (images.length == 1) {
            $(".marina-slider").hide();
            $(".marina-slider-image").attr("src", images[0]);
          } else {
            $(".single-image").hide();
            $.each(images, function(index, image) {
              jQuery('<img>', {
                src: image,
                class: 'marina-slider-image'
              }).wrap("<div class='splide__slide _50'>").parent().appendTo('#image-list');
            });
          }
        }
        $("#total-slips").text((source.total_slips) ? source.total_slips : "- -");
        $("#min-length").text((source.min_boat_length) ? source.min_boat_length : "- -");
        $("#max-length").text((source.max_boat_length) ? source.max_boat_length : "- -");
        $("#approach-depth").text((source.approach_depth) ? source.approach_depth : "- -");
        $("#dock-depth").text((source.dock_depth) ? source.dock_depth : "- -");
        $("#overview-content").html(source.content);
        if (!source.amenities) {
          $("#amenities-list").hide();
        } else {
          $('.amenities-list').empty();
          var amenities = source.amenities;
          $.each(amenities, function(index, x) {
            jQuery('<li>', {
              text: x
            }).appendTo('.amenities-list');
          });
        }
        if (!source.mega_yacht_slips) {
          $("#mega_yacht_slips").hide();
        }
        if (source.lat) {
          $("#latitude").text("Latitude: " + source.lat);
        }
        if (source.lng) {
          $("#longitude").text("Longitude: " + source.lng);
        }
        if (!source.marina_rates) {
          $("#marina_rates").hide();
        } else {
          $(".marina_rates").html(source.marina_rates);
        }
        if (!source.marina_policies) {
          $("#marina_policies").hide();
        } else {
          $(".marina_policies").html(source.marina_policies);
        }
        if (!source.marina_policies && !source.marina_rates) {
          $("#rates-link").hide();
        }
        if (source.snag_reservation_link) {
          $("#sas_bookingwidget").attr("data-url", source.snag_reservation_link);
        } else {
          $(".marina-result-content").css("width", "100%");
          $(".amenities-list").css("max-height", "200px");
          $('.marina-result-sidebar').hide();
        }
        sasBookingWidgets();
        if (!source.gas_price && !source.diesel_price) {
          $("#fuel-link").hide();
        } else {
          if (!source.gas_price) {
            $("#gas_price").hide();
          } else {
            $("#gas-price").text(source.gas_price)
          }
          if (!source.diesel_price) {
            $("#diesel_price").hide();
          } else {
            $("#diesel-price").text(source.diesel_price)
          }
          if (!source.fuel_hours) {
            $("#fuel_hours").hide();
          } else {
            $("#fuel-hours").html(source.fuel_hours)
          }
          if (!source.mastercard) {
            $(".mastercard").hide();
          }
          if (!source.visa) {
            $(".visa").hide();
          }
          if (!source.amex) {
            $(".amex").hide();
          }
          if (!source.check) {
            $(".check-payment").hide();
          }
        }
      } else {
        console.log('error')
      }
      if (!source.marina_policies && !source.marina_rates &&
        $("#fuel-link").is(":hidden") && !source.gas_price && !source.diesel_price) {
        $("#info-link").hide();
        $("#marina-dropdown").hide();
      }
    }
    // Send request
    request.send()
  }