export function tree2array(menuList, result) {
  if (!result) {
    return;
  }
  for (menu in menuList) {
    if (menu.is_leaf) {
      result.push(menu);
    } else if (menu.list && menu.list.length !== 0) {
      flatMenuList(menu.list, result);
    }
  }
}
