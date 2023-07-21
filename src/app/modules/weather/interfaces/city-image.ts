export interface CityImage {
  attribution: Attribution,
  image: Image
}

export interface Attribution {
  license: string,
  photographer: string,
  site: string,
  source: string
}

export interface Image {
  mobile: string,
  web: string
}

export interface Links {
  curies: Cury[],
  self: Self
}

export interface Cury {
  href: string,
  name: string,
  templated: boolean
}

export interface Self {
  href: string
}

