import { Box, Badge } from "@mui/material"
import ImageIcon from "@mui/icons-material/Image"

interface ProductItemProps {
  name: string
  price: string
  badge: string
  image?: string
  onClick?: () => void
}

export const ProductItem = ({
  name,
  price,
  badge,
  image,
  onClick,
}: ProductItemProps) => {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        p: 2,
        textAlign: "left",
        width: "180px",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
      onClick={onClick}
    >
      <Box sx={{ mb: 1, display: "flex", justifyContent: "flex-end" }}>
        <Badge
          className="mb-2 mr-2"
          badgeContent={badge}
          color="primary"
          max={99999}
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "0.7rem",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 80,
          mb: 1,
          backgroundColor: "background.paper",
          borderRadius: 1,
        }}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          <ImageIcon sx={{ color: "action.disabled", fontSize: 40 }} />
        )}
      </Box>
      <Box
        sx={{
          fontWeight: "bold",
          mb: 0.5,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontSize: ".9em",
        }}
      >
        {name}
      </Box>
      <Box sx={{ color: "primary.main", fontWeight: "bold", fontSize: ".9em" }}>
        {price}
      </Box>
    </Box>
  )
}
