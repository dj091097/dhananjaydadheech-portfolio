export interface Solution {
  description: string;
  points?: string[];
}

export interface Impact {
  description: string;
  points?: string[];
}

export interface Project {
  id: number;
  title: string;
  summary: string;
  challenge: string;
  solution: Solution;
  impact: Impact;
  technologies: string[];
  icon: string;
}

// SVG path data for icons
const iconPaths = {
  chart: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  rocket: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
  utensils: "M3 3h18v18H3zM12 12h.01M16 12h.01M8 12h.01M12 16h.01M16 16h.01M8 16h.01M12 8h.01M16 8h.01M8 8h.01",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  users: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  snowflake: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
};

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Vendor Allocation System",
    summary: "Developed an automated system for indent assignments based on scoring mechanism, increasing Fill rate by 6-7%.",
    challenge: "Manual vendor allocation was inefficient and resulted in lower fill rates, causing inventory shortages and customer dissatisfaction.",
    solution: {
      description: "Developed an automated system that analyzes vendor performance data and assigns indents based on a scoring mechanism that considers historical fill rates, delivery times, and quality metrics.",
      points: [
        "Automated performance tracking",
        "Vendor scoring algorithm",
        "Real-time allocation dashboard",
        "Performance feedback loop"
      ]
    },
    impact: {
      description: "Increased fill rate by 6-7%, reducing stockouts and improving customer satisfaction. The system also reduced manual allocation time by 85% and improved vendor relations through transparent performance metrics."
    },
    technologies: ["SQL", "Python", "Power BI", "Azure", "Statistical Modeling"],
    icon: iconPaths.chart
  },
  {
    id: 2,
    title: "OOS Predictor Dashboard",
    summary: "Developed hourly out-of-stock predictor to identify SKUs at risk of stockout, improving availability by 4%.",
    challenge: "Reactive approach to stockouts was causing customer dissatisfaction and lost sales opportunities. The company needed to anticipate potential out-of-stock situations before they occurred.",
    solution: {
      description: "Developed an hourly out-of-stock predictor dashboard that identifies SKUs at risk of stockout using machine learning algorithms that analyze:",
      points: [
        "Historical inventory depletion rates",
        "Current stock levels",
        "Incoming orders",
        "Time-based demand patterns",
        "Seasonal factors"
      ]
    },
    impact: {
      description: "Improved product availability by 4% by enabling proactive replenishment. This resulted in:",
      points: [
        "Reduced lost sales",
        "Improved customer satisfaction",
        "More efficient inventory management",
        "Optimized supply chain operations"
      ]
    },
    technologies: ["Python", "Machine Learning", "Tableau", "SQL", "Time Series Analysis"],
    icon: iconPaths.rocket
  },
  {
    id: 3,
    title: "Dish Recommendation System",
    summary: "Built data-driven recommendation system using advanced algorithms, boosting CTR by 10% and CVR by 20%.",
    challenge: "Generic food recommendations were resulting in lower engagement and conversion rates. The company needed to provide personalized dish suggestions to improve user experience.",
    solution: {
      description: "Built a data-driven dish recommendation system using advanced algorithms that analyze:",
      points: [
        "User order history and preferences",
        "Similar user behavior patterns",
        "Time of day and seasonal popularity",
        "Item affinity and pairing patterns",
        "Trending dishes and regional preferences"
      ]
    },
    impact: {
      description: "The recommendation system significantly improved engagement metrics:",
      points: [
        "10% increase in Click-Through Rate (CTR)",
        "20% increase in Conversion Rate (CVR)",
        "15% higher average order value",
        "Improved user satisfaction and retention"
      ]
    },
    technologies: ["Python", "ML Algorithms", "SQL", "Collaborative Filtering", "Content-Based Filtering"],
    icon: iconPaths.utensils
  },
  {
    id: 4,
    title: "Fraud Detection & Prevention",
    summary: "RCA-driven fraud detection prevented ₹10 Lakhs loss from coupon exploit, collaborating with engineering team.",
    challenge: "A sudden increase in new user sign-ups was accompanied by suspicious coupon usage patterns, suggesting potential exploitation of promotional offers.",
    solution: {
      description: "Conducted a thorough Root Cause Analysis (RCA) to identify the source of the issue:",
      points: [
        "Analyzed user registration patterns and anomalies",
        "Mapped coupon usage flows and identified vulnerabilities",
        "Developed fraud detection algorithms to identify suspicious behavior",
        "Collaborated with engineering team to implement fixes"
      ]
    },
    impact: {
      description: "Successfully prevented ₹10 Lakhs in potential losses by:",
      points: [
        "Identifying and closing the technical loophole",
        "Implementing new validation checks",
        "Establishing ongoing monitoring protocols",
        "Creating an early warning system for similar patterns"
      ]
    },
    technologies: ["SQL", "Data Analysis", "RCA", "Anomaly Detection", "Pattern Recognition"],
    icon: iconPaths.search
  },
  {
    id: 5,
    title: "Customer Segmentation",
    summary: "Implemented KNN and K-means Clustering Algorithms for creating Customer Segments for targeted marketing.",
    challenge: "Generic marketing campaigns were yielding suboptimal results. The company needed to better understand customer groups for targeted marketing efforts.",
    solution: {
      description: "Implemented advanced clustering algorithms (KNN and K-means) to create meaningful customer segments based on:",
      points: [
        "Purchase history and frequency",
        "Average order value",
        "Product category preferences",
        "Browsing and interaction patterns",
        "Geographic and demographic factors"
      ]
    },
    impact: {
      description: "The customer segmentation enabled:",
      points: [
        "25% higher response rates to targeted campaigns",
        "18% increase in campaign ROI",
        "Better resource allocation for marketing initiatives",
        "More personalized customer experiences",
        "Improved customer retention strategies"
      ]
    },
    technologies: ["Python", "KNN Algorithm", "K-means Clustering", "Data Mining", "Statistical Analysis"],
    icon: iconPaths.users
  },
  {
    id: 6,
    title: "Snowflake Cost Forecasting",
    summary: "Developed Python tool to estimate and forecast Snowflake costs, enhancing tech budget planning efficiency.",
    challenge: "Unpredictable Snowflake cloud computing costs were making budget planning difficult and causing occasional overruns. The company needed better visibility into future expenses.",
    solution: {
      description: "Developed a Python-based forecasting tool that:",
      points: [
        "Analyzes historical usage patterns and costs",
        "Identifies cost drivers and inefficiencies",
        "Projects future costs based on growth trends",
        "Simulates cost impacts of workload changes",
        "Recommends optimization opportunities"
      ]
    },
    impact: {
      description: "The tool significantly improved financial planning by:",
      points: [
        "Reducing budget variance by 30%",
        "Identifying 15% in potential cost savings",
        "Enabling more accurate tech budget forecasting",
        "Providing transparency for stakeholders",
        "Supporting data-driven infrastructure decisions"
      ]
    },
    technologies: ["Python", "Snowflake", "Time Series Forecasting", "Data Visualization", "Statistical Modeling"],
    icon: iconPaths.snowflake
  }
];
