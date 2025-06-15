import { Article } from "../models/Article";

class ArticlesViewModel {
  private allArticles: Article[] = [
    {
      id: 1,
      title: "New Dental Technology Revolutionizes Treatment",
      date: "2024-12-28",
      summary: "Discover how the latest dental advancements improve patient care.",
      content:
        "We’re excited to announce a breakthrough in dental technology that enables faster and more precise treatments. This innovation will transform the way we approach dental care, ensuring better outcomes for patients.",
    },
    {
      id: 2,
      title: "Holiday Closure Announcement",
      date: "2024-12-25",
      summary: "We will be closed for the holiday season.",
      content:
        "Dear patients, please note that our clinic will be closed on December 25th for the holidays. We wish you all a wonderful holiday season. Regular appointments will resume on December 26th.",
    },
    {
      id: 3,
      title: "Tips for Better Dental Hygiene",
      date: "2024-12-15",
      summary: "Simple steps to maintain a healthy smile.",
      content:
        "Brush your teeth twice daily, floss regularly, and visit your dentist for routine check-ups. Proper dental hygiene can prevent cavities and ensure a lifetime of healthy smiles.",
    },
  ];

  selectedArticle: Article | null = null;

  getArticles(): Article[] {
    return this.allArticles;
  }

  setSelectedArticle(article: Article | null) {
    this.selectedArticle = article;
  }

  getSelectedArticle(): Article | null {
    return this.selectedArticle;
  }
}

export default ArticlesViewModel;
