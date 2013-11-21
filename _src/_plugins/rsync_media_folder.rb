# http://rentzsch.tumblr.com/post/58936832594/speed-up-jekyll-using-one-weird-trick
module Jekyll    
    class RsyncMediaFolder < Generator
        def generate(site)
            system('mkdir -p _site'); # We may be called before _site exists.
            system('rsync --archive _src/_media/ _site/media/');
        end
    end
end