# 🍕 FoodHub Data Analysis Project

**Author:** Sourojit Dhua  
**Project:** Python Foundations - Food Delivery Data Analysis

---

## 📊 Project Overview

This project analyzes food delivery data from FoodHub, a food aggregator company operating in New York. The analysis explores customer ordering patterns, restaurant performance, and delivery metrics to provide insights that can enhance customer experience and business operations.

## 🎯 Objective

As a Data Scientist for FoodHub, I analyzed order data to understand:
- Restaurant demand patterns
- Customer behavior across weekdays vs weekends
- Food preparation and delivery time trends
- Rating patterns and customer satisfaction
- Cost analysis across different cuisine types

## 📈 Dataset Description

The dataset contains **1,898 food orders** with the following features:

| Column | Description |
|--------|-------------|
| `order_id` | Unique identifier for each order |
| `customer_id` | Customer identification number |
| `restaurant_name` | Name of the restaurant (178 unique restaurants) |
| `cuisine_type` | Type of cuisine ordered (14 different cuisines) |
| `cost_of_the_order` | Order cost in USD |
| `day_of_the_week` | Weekday vs Weekend classification |
| `rating` | Customer rating (1-5 scale) |
| `food_preparation_time` | Time taken by restaurant (20-35 minutes) |
| `delivery_time` | Time taken for delivery (15-33 minutes) |

## 🔍 Key Findings

### Data Quality
- ✅ **Complete Dataset**: No missing values across all 1,898 records
- ✅ **Clean Data**: All columns properly formatted with appropriate data types

### Performance Metrics
- **Average Order Cost**: $16.50
- **Food Preparation Time**: 20-35 minutes (avg: 27.4 minutes)
- **Delivery Time**: 15-33 minutes (avg: 24.2 minutes)
- **Total Restaurants**: 178 unique establishments
- **Cuisine Variety**: 14 different cuisine types

## 🛠️ Technical Implementation

### Tools & Libraries Used
- **Python 3.x**
- **Pandas** - Data manipulation and analysis
- **NumPy** - Numerical computations
- **Matplotlib** - Data visualization
- **Seaborn** - Statistical data visualization

### Analysis Workflow
1. **Data Loading & Exploration** - Understanding dataset structure
2. **Data Quality Assessment** - Checking for missing values and data types
3. **Statistical Analysis** - Descriptive statistics and summary metrics
4. **Exploratory Data Analysis** - Uncovering patterns and insights
5. **Visualization** - Creating meaningful charts and graphs

## 📁 Project Structure

```
├── foodhub_order.csv                           # Raw dataset
├── Learner_Notebook_Full_Code_Sourojit_Dhua.ipynb  # Complete analysis notebook
├── index.html                                  # HTML export of notebook
├── README.md                                   # Project documentation
└── Python notebook header graphic...webp      # Project visualization
```

## 🚀 Getting Started

1. **Clone the repository**
2. **Install required libraries**:
   ```bash
   pip install pandas numpy matplotlib seaborn
   ```
3. **Open the Jupyter notebook** to explore the complete analysis
4. **Run the analysis** step by step to reproduce results

## 💡 Business Impact

This analysis provides actionable insights for FoodHub to:
- Optimize restaurant partnerships based on demand patterns
- Improve delivery time estimates
- Enhance customer satisfaction through data-driven decisions
- Identify high-performing restaurants and cuisine types

## 📧 Contact

**Sourojit Dhua**  
Data Science Enthusiast | Python Developer

---

*This project demonstrates proficiency in Python data analysis, statistical computing, and business intelligence using real-world food delivery data.*
