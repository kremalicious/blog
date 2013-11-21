# Filters taken from the Octopress project by Brandon Mathis.
# https://github.com/imathis/octopress/blob/master/plugins/octopress_filters.rb
module Jekyll

  module Filters
    
    # Used on the blog index to split posts on the <!--more--> marker
    def excerpt(input)
      if input.index(/<!--\s*more\s*-->/i)
        input.split(/<!--\s*more\s*-->/i)[0]
      else
        input
      end
    end
    
    # Checks for excerpts (helpful for template conditionals)
    def has_more(input)
      input =~ /<!--\s*more\s*-->/i ? true : false
    end

    # Replaces relative urls with full urls
    def expand_urls(input, url='')
      url ||= '/'
      input.gsub /(\s+(href|src)\s*=\s*["|']{1})(\/[^\"'>]*)/ do
        $1+url+$3
      end
    end

  end

end
Liquid::Template.register_filter(Jekyll::Filters)
