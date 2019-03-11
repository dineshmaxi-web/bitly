var url = "";
$("#shorten").click(function(){
  var longurl = $("input").val();
  $.ajax({
    url: "https://api-ssl.bitly.com/v3/shorten?longUrl="+longurl+"&access_token=57f0a8845124ac6c2b207ea57f84daa3b68ef2fc",
    type: "POST",
    success: function(res){
      $.ajax({
            url: "/post",
            type: "POST",
            data: {
              url : res.data.url
            },
            success: function(res){
              console.log(res);
                if(res.url)
                  $("#shortened").html("<div class='well'><b>Shortened url of "+longurl+" : </b><p id='shorturl'>"+res.url+"</p></div>");
                else if(res.status_txt == "INVALID_URI")
                  $("#shortened").html("<div class='well'><b>Status code : "+res.status_code+". This is an "+res.status_txt+"</b></div>");
                else
                  $("#shortened").html("<div class='well'><b>Status code : "+res.status_code+". Enter URL in the above input field ("+res.status_txt+")</b></div>");

            },
            error: function(err){
              alert("error");
            }
          }); 
      },
    error: function(err){
      $("#shortened").html("<div class='well'><b>"+err+"</b></div>");
    } 
  }); 
}); 
  
  
  $("#buserinfo").click(function(){
  $.get("https://api-ssl.bitly.com/v3/user/info?access_token=57f0a8845124ac6c2b207ea57f84daa3b68ef2fc", function(data, status){
    //console.log(data);
    $("#userinfo").html("<div class='well' style='text-align: left'><i> Display name &nbsp;: "+data.data.display_name+" <br>Member since : "+new Date (Number(data.data.member_since))+"</i></div>");
  });
});
  
  $("#bhistory").click(function(){
  $.get("https://api-ssl.bitly.com/v3/user/link_history?access_token=57f0a8845124ac6c2b207ea57f84daa3b68ef2fc", function(data, status){
    //console.log(data);
    for(var i = 0 ; i < data.data.link_history.length ; i++) 
    {
        console.log(data.data.link_history);
        $("#history").append("<div class='well' style='text-align: left'>"+
                              data.data.link_history[i].title+
                              "<hr><i><b>Original URL &nbsp;&nbsp; : </b>"+
                              data.data.link_history[i].long_url+
                              "<br><b>Shortened URL : </b><a href="
                              +data.data.link_history[i].link+
                              " target=_blank>"+
                              data.data.link_history[i].link+
                              "</a></i><br></div>");
    }
    });
});