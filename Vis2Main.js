// this is the main file

// create tree manager
window.TreeManager = new Vis2TreeManager("SampleTrees1.txt");

assert (window.TreeManager.GetNumTrees() > 0, "no trees loaded");

// create view manager
window.ViewManager = new Vis2ViewManager2();
