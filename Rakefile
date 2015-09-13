require 'rubygems'
require 'optparse'
require 'yaml'

#
# Create New Post
# rake post -- Title
#
task :post do
  OptionParser.new.parse!
  ARGV.shift
  title = ARGV.join(' ')

  path = "_src/_drafts/#{Date.today}-#{title.downcase.gsub(/[^[:alnum:]]+/, '-')}.md"

  if File.exist?(path)
      puts "Dude, file exists - skipping create"
  else
    File.open(path, "w") do |file|
      file.puts YAML.dump({
          'layout' => 'post',
          'title' => title,
          'image' => 'REPLACEME.jpg',
          'author' => 'Matthias Kretschmann',
          'date' => Time.now
      })
      file.puts "---"
    end
  end
  `atom #{path}`

  exit 1
end

#
# Create New Photo Post
# rake photo -- Title
#
task :photo do
  OptionParser.new.parse!
  ARGV.shift
  title = ARGV.join(' ')

  path = "_src/_drafts/#{Date.today}-#{title.downcase.gsub(/[^[:alnum:]]+/, '-')}.md"

  if File.exist?(path)
      puts "Dude, file exists - skipping create"
  else
    File.open(path, "w") do |file|
      file.puts YAML.dump({
          'layout' => 'photo',
          'title' => title,
          'image' => 'REPLACEME.jpg',
          'author' => 'Matthias Kretschmann',
          'date' => Time.now,
          'category' => 'photos'
      })
      file.puts "---"
    end
  end
  `atom #{path}`

  exit 1
end

#
# Create New Link Post
# rake link -- Title
#
task :photo do
  OptionParser.new.parse!
  ARGV.shift
  title = ARGV.join(' ')

  path = "_src/_drafts/#{Date.today}-#{title.downcase.gsub(/[^[:alnum:]]+/, '-')}.md"

  if File.exist?(path)
      puts "Dude, file exists - skipping create"
  else
    File.open(path, "w") do |file|
      file.puts YAML.dump({
          'layout' => 'link',
          'title' => title,
          'author' => 'Matthias Kretschmann',
          'date' => Time.now
      })
      file.puts "---"
    end
  end
  `atom #{path}`

  exit 1
end
