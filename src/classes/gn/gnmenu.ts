

export class Gnmenu {
  public Categ: Gncateg[];
}

export class Gncateg {
  public men_cate: string;
  public cat_nomb: string;
  public cat_icon: string;
  public Subm: Gnsubm[];
}

export class Gnsubm {
  public men_prog: string;
  public men_nomb: string;
  public men_cate: string;
  public men_urla: string;
}
