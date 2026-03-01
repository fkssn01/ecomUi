import streamlit as st
import pandas as pd
import plotly.express as px


st.set_page_config(
    page_title="FK STORES | Analytics", 
    layout="wide"
)

SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSR-Us6m4-gxaam7GXVnAz7rRxqr10NYJRhAgmg0dlJZUBzc8rASIl5HOgbE6j2PTAur2Djik1TsGf2/pub?output=csv"

st.title("FK STORES: Real-Time Revenue Dashboard")
st.markdown("---")

try:
  
    df = pd.read_csv(SHEET_URL)
    
    df['Items'] = df['Items'].astype(str)
    df['OrderID'] = df['OrderID'].astype(str)
    
    
    df['Price_Numeric'] = df['Total Price'].replace('[₦,]', '', regex=True).astype(float)

    df['Date_Proper'] = pd.to_datetime(df['Date'], dayfirst=True)
    df['Date_Only'] = df['Date_Proper'].dt.normalize() 

   
    col1, col2, col3 = st.columns(3)
    with col1:
        total_rev = df['Price_Numeric'].sum()
        st.metric("Total Revenue", f"N{total_rev:,.0f}")
    with col2:
        total_orders = len(df)
        st.metric("Total Orders", total_orders)
    with col3:
        avg_order = total_rev / total_orders if total_orders > 0 else 0
        st.metric("Avg. Order Value", f"N{avg_order:,.0f}")

   
    daily_revenue = df.groupby('Date_Only')['Price_Numeric'].sum().reset_index()

    
    fig = px.bar(
        daily_revenue, 
        x='Date_Only', 
        y='Price_Numeric', 
        title='Daily Revenue Trend',
        labels={'Price_Numeric': 'Sales (N)', 'Date_Only': 'Date'},
        color_discrete_sequence=["#473F47"] 
    )

  
    fig.update_layout(
        bargap=0.3,
        xaxis_title=None,
        yaxis_title="Revenue (N)",
        hovermode="x unified",
        template="plotly_dark" 
    )

    st.plotly_chart(fig, use_container_width=True)

   
    st.subheader("Recent Order Log")
    if st.checkbox("Show Order Details"):
  
        display_df = df[['Date_Proper', 'OrderID', 'Items', 'Total Price']].sort_values(by='Date_Proper', ascending=False)
        st.dataframe(display_df, use_container_width=True)

except Exception as e:
    st.warning("Connect your Google Sheet 'Publish to Web' URL to see live data.")
    st.error(f"Error Details: {e}")