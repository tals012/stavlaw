import type { Article } from "./types";
import { article as pitzuyeiPiturim } from "./articles/pitzuyei-piturim";
import { article as shimuaLifneiPiturim } from "./articles/shimua-lifnei-piturim";
import { article as piturimBeheriyon } from "./articles/piturim-beheriyon";
import { article as shaotNosafot } from "./articles/shaot-nosafot";
import { article as hitamrutBaavoda } from "./articles/hitamrut-baavoda";
import { article as hitpatrutBedinMefutar } from "./articles/hitpatrut-bedin-mefutar";
import { article as hatradaMinit } from "./articles/hatrada-minit";
import { article as sacharLoShulam } from "./articles/sachar-lo-shulam";
import { article as freelancerVsEmployee } from "./articles/freelancer-vs-employee";
import { article as zechuyotPensiya } from "./articles/zechuyot-pensiya";
import { article as avodaMerachok } from "./articles/avoda-merachok";
import { article as maamadOvedZar } from "./articles/maamad-oved-zar";

export const articles: Article[] = [
  pitzuyeiPiturim,
  shimuaLifneiPiturim,
  piturimBeheriyon,
  shaotNosafot,
  hitamrutBaavoda,
  hitpatrutBedinMefutar,
  hatradaMinit,
  sacharLoShulam,
  freelancerVsEmployee,
  zechuyotPensiya,
  avodaMerachok,
  maamadOvedZar,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const articleBySlug = new Map(articles.map((a) => [a.slug, a]));

export function articlesByCategory(category: string): Article[] {
  return articles.filter((a) => a.category === category);
}

export { categories, categoryBySlug } from "./categories";
