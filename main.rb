module DCConDownload
    require 'uri'
    require 'net/http'
    require 'json'

    def self.getDCConData(dccon_no)
        url = URI("https://dccon.dcinside.com/index/package_detail")

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true

        request = Net::HTTP::Post.new(url)
        request["content-type"] = 'multipart/form-data; boundary=---011000010111000001101001'
        request["x-requested-with"] = 'XMLHttpRequest'
        request.body = "-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"package_idx\"\r\n\r\n#{dccon_no}"

        response = http.request(request)

        data = JSON.parse(response.read_body)
        return data
    end

    def self.downloadSingleDCCon(path, ext, filename, filepath=nil)
        url_prefix = "https://dcimg5.dcinside.com/dccon.php?no="
        url = URI(url_prefix + path)

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true

        request = Net::HTTP::Get.new(url)
        request["referer"] = 'https://dccon.dcinside.com/'

        response = http.request(request)
        if filepath
            File.open("#{filepath}/#{filename}.#{ext}", "wb") { |f| f.write response.read_body }
        else
            File.open("#{filename}.#{ext}", "wb") { |f| f.write response.read_body }
        end
        return "#{filename}.#{ext}"
    end

    def self.downloadDCCons(dccon_no)
        data = getDCConData(dccon_no)
        Dir.mkdir(data["info"]["title"]) unless File.exists?(data["info"]["title"])
        cnt = 0
        data["detail"].each do |elem|
            downloadSingleDCCon(elem["path"], elem["ext"], cnt, data["info"]["title"])
            cnt += 1
        end
    end
end

#Senko san S2
#downloadDCCons(52640)

