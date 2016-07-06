import PlayListView from "./view/PlayListView";
import Panel from "./panel/Panel";

function main() {
    const panel = new Panel("nm-panel");
    panel.title = "Panel Title";
    const playListView = new PlayListView("play-list");

    panel.addSubView(playListView);
    $(document.body).append(panel.$element);

}

$(main);
