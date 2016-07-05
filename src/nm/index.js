import TrackListView from "./view/TrackListView";

$(main);

function main()
{
    const trackListView = new TrackListView();
    $(document.body).append(trackListView.$element);
    $.ajax({
        url: "http://music.163.com/api/playlist/detail?id=94136185"
    }).then(res => {
        trackListView.tracks = res.result.tracks;
        console.log(res.result.tracks);
    });
}
