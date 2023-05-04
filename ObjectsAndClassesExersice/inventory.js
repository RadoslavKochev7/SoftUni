function inventory(params) {

    let heroes = [];
    for (let row of params) {
        let [hero, level, items] = row.split(' / ');

        heroes.push({hero, level, items});
        (hero);
    }

    heroes.sort((a,b) => a.level - b.level)
          .forEach((hero) => {
             console.log(`Hero: ${hero.hero}\nlevel => ${hero.level}\nitems => ${hero.items}`)
          })
}

inventory(
    [
        'Isacc / 25 / Apple, GravityGun',
        'Derek / 12 / BarrelVest, DestructionSword',
        'Hes / 1 / Desolator, Sentinel, Antara'
    ]
)