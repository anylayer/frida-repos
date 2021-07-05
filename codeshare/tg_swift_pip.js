const PIPVideoWindowClass = Object.keys(ObjC.classes).filter(function(k) {
    return k.indexOf('PIPVideoWindow') !== -1;
})[0];

var pipmoved = ObjC.classes[PIPVideoWindowClass]['- mouseMoved:'];
pipmoved.orig = pipmoved.implementation;
pipmoved.implementation = ObjC.implement(pipmoved, function(s, c, e) {
    ObjC.Object(s).setCollectionBehavior_(0x101);
    return pipmoved.orig(s, c, e);
});