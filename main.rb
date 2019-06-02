require 'uri'
require 'net/http'
require 'json'

def getDCConData(dccon_no)
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

def downloadSingleDCCon(path, ext, filename)
    url_prefix = "https://dcimg5.dcinside.com/dccon.php?no="
    url = URI(url_prefix + path)

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    request = Net::HTTP::Get.new(url)
    request["referer"] = 'https://dccon.dcinside.com/'

    response = http.request(request)
    
    File.open("#{filename}.#{ext}", "wb") { |f| f.write response.read_body }
    return "#{filename}.#{ext}"
end

def downloadDCCons(dccon_no)
    data = getDCConData(dccon_no)

    cnt = 0
    data["detail"].each do |elem|
        downloadSingleDCCon(elem["path"], elem["ext"], cnt)
        cnt += 1
    end
end

#Senko san S2
#downloadDCCons(52640)

