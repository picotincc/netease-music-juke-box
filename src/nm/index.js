import ApplicationController from "./app/ApplicationController";


function main()
{

    const applicationController = new ApplicationController("app");
    applicationController.view.placeAt(document.body);
    applicationController.run();
}

$(main);
