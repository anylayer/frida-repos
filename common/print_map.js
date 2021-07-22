function print_map(map){
    var keyset = map.keySet();
    var it = keyset.iterator();
    while (it.hasNext()) {
        var key = it.next().toString();
        var value = map.get(key).toString();
        console.log(key);
        console.log(value);
    }
}
