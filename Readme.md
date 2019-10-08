# dccon-downloader

**사이트 : https://cereme.dev/dccon-downloader/**

~~Tools : Ruby, Insomnia~~

with Python3.7, Insomnia, AWS Lambda, React.js

contact : bsy@breadlab.net

## 🚧WIP
  - [x] AWS Lambda에서 search하기
  - [x] AWS Lambda에서 save(as zip)하기
  - [x] AWS Lambda에서 file response하기
  - [ ] AWS Lambda에서 6MB가 넘는 response 처리하기
    - [ ] S3에 저장하고, Object Expiration 설정하기..?
  - [x] Web Frontend 만들기
  - [x] AWS Lambda 빠르게 만들기
    - [x] aiohttp 사용해보기
    * ThreadPool은 Lambda의 Limit도 있고, 완전하지 않은 해결책인 것 같다.
  - [x] Web Frontend 검색기능 만들기
  - [ ] Web Frontend 이쁘게 만들기
    - [ ] AntDesign 써서 이쁘게 만들기

## (previous) Usage

~~~
ruby main.rb <dccon_number>
~~~
---

rails나 sinatra 연습용로 만들려고 했는데 그냥 serverless python으로 만드려구요