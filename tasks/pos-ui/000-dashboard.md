- Filter data berdasarkan hari ini
- Filter data berdasarkan kemarin
- Filter data berdasarkan 7 hari terakhir
- Filter data berdasarkan date range

## Data yang ditampilkan

- Nama Outlet
- Tombol Refresh
- Ui untuk filter data tanggal
- Total Pendapatan
- Total Transaksi
- Laba Kotor (Estimasi)
- Rata-rata Basket (Nilai penjualan rata-rata tiap transaksi sales)
- Grafik tren penjualan
- List Produk terlaris menampilkan (nama produk,total penjualan,nilai penjualan)

data yang dihasilkan:

```json
{
  "start_date": "2026-01-01",
  "end_date": "2026-01-31",
  "outlet_id": 16,
  "outlet_name": "F2F Mart",
  "total_revenue": "6381000.00",
  "total_transactions": 267,
  "average_transaction_value": "23898.88",
  "total_operational_expense": "0.00",
  "total_expense": "0.00",
  "simple_gross_profit": "6381000.00",
  "profit_note": "Belum termasuk HPP/COGS",
  "top_products_by_quantity": [
    {
      "product_id": 458,
      "product_name": "Aqua Botol 600ml",
      "total_quantity": 237,
      "total_revenue": "948000.00"
    },
    {
      "product_id": 460,
      "product_name": "Pulpen Pilot HItam",
      "total_quantity": 212,
      "total_revenue": "636000.00"
    },
    {
      "product_id": 457,
      "product_name": "Oreo Coklat",
      "total_quantity": 195,
      "total_revenue": "1755000.00"
    },
    {
      "product_id": 456,
      "product_name": "Chitato Sapi Panggang",
      "total_quantity": 189,
      "total_revenue": "2268000.00"
    },
    {
      "product_id": 459,
      "product_name": "Teh Pucuk Harum",
      "total_quantity": 172,
      "total_revenue": "774000.00"
    }
  ],
  "top_products_by_revenue": [],
  "low_stock_item_count": 0,
  "sales_chart": [
    {
      "date": "2026-01-01",
      "total_revenue": "225000.00",
      "total_count": 9
    },
    {
      "date": "2026-01-02",
      "total_revenue": "214500.00",
      "total_count": 9
    },
    {
      "date": "2026-01-03",
      "total_revenue": "582500.00",
      "total_count": 27
    },
    {
      "date": "2026-01-04",
      "total_revenue": "747500.00",
      "total_count": 26
    },
    {
      "date": "2026-01-05",
      "total_revenue": "222000.00",
      "total_count": 12
    },
    {
      "date": "2026-01-06",
      "total_revenue": "181500.00",
      "total_count": 8
    },
    {
      "date": "2026-01-07",
      "total_revenue": "297000.00",
      "total_count": 11
    },
    {
      "date": "2026-01-08",
      "total_revenue": "321000.00",
      "total_count": 12
    },
    {
      "date": "2026-01-09",
      "total_revenue": "297500.00",
      "total_count": 14
    },
    {
      "date": "2026-01-10",
      "total_revenue": "582000.00",
      "total_count": 26
    },
    {
      "date": "2026-01-11",
      "total_revenue": "569000.00",
      "total_count": 24
    },
    {
      "date": "2026-01-12",
      "total_revenue": "345000.00",
      "total_count": 15
    },
    {
      "date": "2026-01-13",
      "total_revenue": "272000.00",
      "total_count": 14
    },
    {
      "date": "2026-01-14",
      "total_revenue": "327500.00",
      "total_count": 13
    },
    {
      "date": "2026-01-15",
      "total_revenue": "120500.00",
      "total_count": 8
    },
    {
      "date": "2026-01-16",
      "total_revenue": "439000.00",
      "total_count": 14
    },
    {
      "date": "2026-01-17",
      "total_revenue": "637500.00",
      "total_count": 25
    }
  ]
}
```
