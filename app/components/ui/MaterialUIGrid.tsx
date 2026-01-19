import React from "react"
import { Grid, Card, CardContent, Typography, Box } from "@mui/material"

interface GridItem {
  id: number
  title: string
  description: string
  color?: string
  component?: React.ReactNode
}

interface MaterialUIGridProps {
  items?: GridItem[]
  columns?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

export const MaterialUIGrid = ({
  items = [
    {
      id: 1,
      title: "Card 1",
      description: "Deskripsi card pertama dengan konten contoh",
    },
    {
      id: 2,
      title: "Card 2",
      description: "Deskripsi card kedua dengan konten contoh",
    },
    {
      id: 3,
      title: "Card 3",
      description: "Deskripsi card ketiga dengan konten contoh",
    },
    {
      id: 4,
      title: "Card 4",
      description: "Deskripsi card keempat dengan konten contoh",
    },
  ],
  columns = { xs: 12, sm: 6, md: 4, lg: 4 },
}: MaterialUIGridProps) => {
  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid {...columns} key={item.id}>
          {item.component ? (
            item.component
          ) : (
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "background.paper",
                color: "text.primary",
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      ))}
    </Grid>
  )
}
