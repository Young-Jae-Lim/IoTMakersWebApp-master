    function readEventLastLog(eventId, startEvent) {
        setTimeout(invokeEventLastLogAPI(eventId, startEvent), 300);
        return false;
    }


    function invokeEventLastLogAPI(eventId,startEvent) {

        // 태그스트림 목록 조회 URI
        var API_URI2 = '/api/v1/event/logByEventId/'+eventId+'/'+startEvent;
        
        $.ajax('https://iotmakers.kt.com' + API_URI2, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token},
            contentType: "application/json",
            dataType:"json",
            success: function (data, status, xhr) {
               printEventLastLog(eventId, startEvent, data.data);  // 성공시, 데이터 출력을 위한 함수 호출
            },
            error: function(xhr,status,e){
                alert("error");
            }
        });
    };

    // 데이터 출력을 위한 함수
    function printEventLastLog(eventId, startEvent, data){
        
        // "디바이스를 선택하세요" 메시지 삭제
        if (document.getElementsByTagName("div")[0] != null)
            document.getElementsByTagName("div")[0].remove();

        $('#rogs').empty();             // id가 tags인 태그 안의 기존 데이터 모두 삭제
        
        var tr = document.createElement("tr");
        var th1 = document.createElement("th");
        var td1 = document.createElement("td");
        th1.setAttribute("style","background-color:lightgrey");
        th1.innerText = "Event ID";
        td1.innerText = eventId;
        tr.append(th1);
        tr.append(td1);
        $('#rogs').append(tr);

        if (data.rows.length > 0) {
            var tr = document.createElement("tr");
            tr.setAttribute("style","background-color:lightgrey");
            var th1 = document.createElement("th");
            var th2 = document.createElement("th");
            th1.innerText = "Event Name";
            th2.innerText = "Value";
            tr.append(th1);
            tr.append(th2);
            $('#rogs').append(tr);

            data.rows.forEach(function(v){

                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var td2 = document.createElement("td");
                td1.innerText = v.evetNm;
                td2.innerText = v.collectEventObj;
                tr.append(td1);
                tr.append(td2);
                $('#rogs').append(tr);

            })
        } 
    }