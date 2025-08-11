import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  IconButton,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";
import {
  Home as HomeIcon,
  GetApp as GetAppIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Language as WebsiteIcon,
  FileDownload as DownloadIcon,
  Nfc as NfcIcon,
  Share as ShareIcon,
  QrCode as QrCodeIcon,
  Search as SearchIcon,
  ContactPage as ContactIcon,
  CalendarMonth as CalendarIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DownloadNotification from "../components/common/DownloadNotification";

function DownloadPage() {
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setShowNotification(false);
  };

  const handleShowNotification = () => {
    setShowNotification(true);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#1E90FF",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      {/* 返回首頁按鈕 */}
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          position: "absolute",
          top: { xs: 20, sm: 32 },
          left: { xs: 20, sm: 32 },
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
          },
        }}
      >
        <HomeIcon />
      </IconButton>

      <Container
        maxWidth="sm"
        sx={{
          textAlign: "center",
          py: 4,
        }}
      >
        {/* 應用圖標 */}
        <Box mb={4}>
          <Avatar
            sx={{
              width: { xs: 100, sm: 120 },
              height: { xs: 100, sm: 120 },
              mx: "auto",
              background: "linear-gradient(135deg, #00BFFF 0%, #1E90FF 100%)",
              fontSize: { xs: 40, sm: 48 },
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              border: "4px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <GetAppIcon sx={{ fontSize: "inherit", color: "white" }} />
          </Avatar>
        </Box>

        {/* 應用標題 */}
        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          color="white"
          mb={3}
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            letterSpacing: "0.5px",
          }}
        >
          AiCard
        </Typography>

        {/* 應用描述 */}
        <Typography
          variant="body1"
          color="rgba(255, 255, 255, 0.9)"
          mb={5}
          sx={{
            fontSize: { xs: "1rem", sm: "1.1rem" },
            lineHeight: 1.6,
            maxWidth: 400,
            mx: "auto",
            textShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
            px: 2,
          }}
        >
          智能卡片管理應用，為您提供便捷的數位生活體驗。
          支援多種卡片類型，安全可靠，操作簡單。
        </Typography>

        {/* 下載按鈕組 */}
        <Stack spacing={2} alignItems="center">
          {/* Google Play 按鈕 */}
          <Button
            variant="contained"
            onClick={handleShowNotification}
            sx={{
              background: "#000000",
              color: "white",
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "600",
              textTransform: "none",
              minWidth: 200,
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
              "&:hover": {
                background: "#333333",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.4)",
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              {/* Google Play 原生圖標 */}
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {/* 簡化版 Google Play 播放符號 */}
                <Box
                  sx={{
                    width: 0,
                    height: 0,
                    borderTop: "8px solid transparent",
                    borderBottom: "8px solid transparent",
                    borderLeft: "12px solid #4285F4",
                    ml: 0.5,
                  }}
                />
              </Box>
              <Box textAlign="left">
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ fontSize: "0.75rem", opacity: 0.8, lineHeight: 1 }}
                >
                  GET IT ON
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "1rem", fontWeight: "bold", lineHeight: 1.2 }}
                >
                  Google Play
                </Typography>
              </Box>
            </Box>
          </Button>

          {/* App Store 按鈕 */}
          <Button
            variant="contained"
            onClick={handleShowNotification}
            sx={{
              background: "#000000",
              color: "white",
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "600",
              textTransform: "none",
              minWidth: 200,
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
              "&:hover": {
                background: "#333333",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.4)",
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              {/* Apple App Store 原生圖標 */}
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </Box>
              <Box textAlign="left">
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ fontSize: "0.75rem", opacity: 0.8, lineHeight: 1 }}
                >
                  Download on the
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "1rem", fontWeight: "bold", lineHeight: 1.2 }}
                >
                  App Store
                </Typography>
              </Box>
            </Box>
          </Button>
        </Stack>

        {/* 手機預覽模擬 */}
        <Box
          mt={6}
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: 280, sm: 320 },
              height: { xs: 500, sm: 550 },
              background: "linear-gradient(135deg, #333 0%, #000 100%)",
              borderRadius: 4.5,
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
              border: "8px solid #333",
            }}
          >
            {/* 手機螢幕 */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                background: "#f5f5f5",
                borderRadius: 2,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* 狀態列 */}
              <Box
                sx={{
                  height: { xs: 36, sm: 40 },
                  background:
                    "linear-gradient(135deg, #1E90FF 0%, #0066CC 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "white",
                    fontSize: { xs: "14px", sm: "16px" },
                    fontWeight: "bold",
                  }}
                >
                  我的電子名片
                </Typography>
              </Box>

              {/* 名片內容 */}
              <Box
                sx={{
                  p: 2,
                  height: { xs: "calc(100% - 36px)", sm: "calc(100% - 40px)" },
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* 名片卡片 */}
                <Card
                  sx={{
                    background: "white",
                    borderRadius: 3,
                    p: 2,
                    mb: 2,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* 個人資訊 */}
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar
                      src="https://s.yimg.com/ny/api/res/1.2/PZ7mLRAvDm6Sl3uw71AwUQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mg--/https://media.zenfs.com/ko/nownews.com/4b26a7f3b368a3856a44945da054424d"
                      sx={{
                        width: { xs: 50, sm: 60 },
                        height: { xs: 50, sm: 60 },
                        fontSize: { xs: "18px", sm: "20px" },
                      }}
                    >
                      王
                    </Avatar>
                    <Box flex={1}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        mb={0.5}
                        sx={{ fontSize: { xs: "14px", sm: "16px" } }}
                      >
                        王小明
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={0.5}
                        sx={{ fontSize: { xs: "11px", sm: "12px" } }}
                      >
                        業務經理
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "10px", sm: "11px" } }}
                      >
                        Tech Innovation, Ltd.
                      </Typography>
                    </Box>
                  </Box>

                  {/* 聯絡資訊 */}
                  <Stack
                    spacing={1}
                    sx={{ background: "#FFF3E0", p: 1.5, borderRadius: 2 }}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <PhoneIcon
                        sx={{ fontSize: { xs: 14, sm: 16 }, color: "#FF9800" }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ fontSize: { xs: "10px", sm: "12px" } }}
                      >
                        0900000000
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <EmailIcon
                        sx={{ fontSize: { xs: 14, sm: 16 }, color: "#FF9800" }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ fontSize: { xs: "10px", sm: "12px" } }}
                      >
                        wang.littleming@email.com
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <WebsiteIcon
                        sx={{ fontSize: { xs: 14, sm: 16 }, color: "#FF9800" }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ fontSize: { xs: "10px", sm: "12px" } }}
                      >
                        www.littlemingking.com
                      </Typography>
                    </Box>
                  </Stack>
                </Card>

                {/* 功能按鈕 */}
                <Stack spacing={1.5} flex={1}>
                  <Button
                    variant="outlined"
                    startIcon={
                      <DownloadIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
                    }
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontSize: { xs: "10px", sm: "12px" },
                      py: 1,
                      borderColor: "#1E90FF",
                      color: "#1E90FF",
                    }}
                  >
                    下載名片
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={
                      <NfcIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
                    }
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontSize: { xs: "10px", sm: "12px" },
                      py: 1,
                      borderColor: "#1E90FF",
                      color: "#1E90FF",
                    }}
                  >
                    NFC 感應
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={
                      <ShareIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
                    }
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontSize: { xs: "10px", sm: "12px" },
                      py: 1,
                      borderColor: "#1E90FF",
                      color: "#1E90FF",
                    }}
                  >
                    分享
                  </Button>
                </Stack>

                {/* 底部導航 */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    py: 1,
                    borderTop: "1px solid #e0e0e0",
                    mt: 2,
                  }}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <SearchIcon
                      sx={{ fontSize: { xs: 16, sm: 18 }, color: "#666" }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: { xs: "8px", sm: "10px" },
                        color: "#666",
                      }}
                    >
                      探索
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <ContactIcon
                      sx={{ fontSize: { xs: 16, sm: 18 }, color: "#666" }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: { xs: "8px", sm: "10px" },
                        color: "#666",
                      }}
                    >
                      名片夾
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{
                      position: "relative",
                      background: "#1E90FF",
                      borderRadius: "50%",
                      width: { xs: 40, sm: 50 },
                      height: { xs: 40, sm: 50 },
                      justifyContent: "center",
                    }}
                  >
                    <QrCodeIcon
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: "white" }}
                    />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <CalendarIcon
                      sx={{ fontSize: { xs: 16, sm: 18 }, color: "#666" }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: { xs: "8px", sm: "10px" },
                        color: "#666",
                      }}
                    >
                      行程管理
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <SettingsIcon
                      sx={{ fontSize: { xs: 16, sm: 18 }, color: "#666" }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: { xs: "8px", sm: "10px" },
                        color: "#666",
                      }}
                    >
                      設置
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 繼續使用網頁版連結 */}
        <Box mt={4}>
          <Button
            variant="text"
            href="/"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              textTransform: "none",
              fontSize: "0.9rem",
              textDecoration: "underline",
              "&:hover": {
                color: "white",
                backgroundColor: "transparent",
              },
            }}
          >
            繼續使用網頁版
          </Button>
        </Box>
      </Container>

      {/* 下載通知對話框 */}
      {showNotification && (
        <DownloadNotification onClose={handleClose} autoHide={false} />
      )}
    </Box>
  );
}

export default DownloadPage;
