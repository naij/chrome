// hao.360.cn
if($('#firstscreen-famous')){
    $('#firstscreen-famous a').each(function(index,node){
        if($(node).text() == '京东商城'){
            $(node).attr('href','http://click.union.360buy.com/JdClick/?unionId=19370&t=1&to=http://www.360buy.com');
        }
    });
}

// hao123.com
if($('#box-famoussite')){
    $('#box-famoussite a').each(function(index,node){
        if($(node).text() == '卓越亚马逊'){
            $(node).attr('href','http://www.amazon.cn/?_encoding=UTF8&tag=345502059-23&linkCode=ur2&camp=536&creative=3200');
        }

        if($(node).text() == '京东商城'){
            $(node).attr('href','http://click.union.360buy.com/JdClick/?unionId=19370&t=1&to=http://www.360buy.com');
        }
    });
}