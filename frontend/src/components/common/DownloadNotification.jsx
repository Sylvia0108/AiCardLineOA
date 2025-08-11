import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Fade,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import {
  Close as CloseIcon,
  GetApp as GetAppIcon,
  Store as StoreIcon,
  PhoneIphone as PhoneIphoneIcon,
  Android as AndroidIcon,
  Computer as ComputerIcon,
  FlashOn as FlashIcon,
} from "@mui/icons-material";

function DownloadNotification({ autoHide = true, duration = 8000, onClose }) {
  const [open, setOpen] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isPWAInstallable, setIsPWAInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // 檢測設備類型
    const ua = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua));
    setIsAndroid(/Android/.test(ua));

    // 監聽 PWA 安裝事件
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsPWAInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 顯示對話框
    setTimeout(() => setOpen(true), 100);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, [autoHide, duration]);

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      setTimeout(onClose, 200); // 等待動畫完成
    }
  };

  // PWA 安裝處理
  const handlePWAInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        console.log("PWA 安裝成功");
      }

      setDeferredPrompt(null);
      setIsPWAInstallable(false);
      handleClose();
    }
  };

  // 應用商店下載
  const handleStoreDownload = () => {
    if (isIOS) {
      window.open(
        "https://apps.apple.com/tw/app/microsoft-word/id462054704?mt=12",
        "_blank"
      );
    } else if (isAndroid) {
      window.open(
        "https://play.google.com/store/apps/details?id=com.yourapp.package",
        "_blank"
      );
    } else {
      window.open("https://apps.apple.com/app/your-app-id", "_blank");
    }

    handleClose();
  };

  const handleNotNow = () => {
    localStorage.setItem(
      "downloadNotificationDismissed",
      Date.now().toString()
    );
    handleClose();
  };

  // 獲取設備圖標
  const getDeviceIcon = () => {
    if (isIOS) return <PhoneIphoneIcon />;
    if (isAndroid) return <AndroidIcon />;
    return <ComputerIcon />;
  };

  // 獲取商店名稱
  const getStoreName = () => {
    if (isIOS) return "App Store";
    if (isAndroid) return "Google Play";
    return "應用商店";
  };

  return (
    <Dialog
      open={open}
      onClose={handleNotNow}
      TransitionComponent={Fade}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          mx: 2,
          my: 4,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <GetAppIcon color="primary" sx={{ fontSize: 32 }} />
            <Box>
              <Typography variant="h6" component="h2" fontWeight="bold">
                安裝 AiCard
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleNotNow} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ py: 2 }}>
        <Stack spacing={2}>
          {/* PWA 安裝選項 */}
          {isPWAInstallable && (
            <Card
              variant="outlined"
              sx={{
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  boxShadow: 2,
                  transform: "translateY(-2px)",
                },
              }}
              onClick={handlePWAInstall}
            >
              <CardContent sx={{ py: 2 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <FlashIcon
                    sx={{
                      fontSize: 32,
                      color: "success.main",
                      backgroundColor: "success.light",
                      borderRadius: "50%",
                      p: 0.5,
                    }}
                  />
                  <Box flex={1}>
                    <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        快速安裝
                      </Typography>
                      <Chip
                        label="推薦"
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      直接安裝到您的設備，無需應用商店
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* 應用商店下載 */}
          <Card
            variant="outlined"
            sx={{
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": {
                boxShadow: 2,
                transform: "translateY(-2px)",
              },
            }}
            onClick={handleStoreDownload}
          >
            <CardContent sx={{ py: 2 }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "primary.light",
                    color: "primary.main",
                  }}
                >
                  {getDeviceIcon()}
                </Box>
                <Box flex={1}>
                  <Typography variant="subtitle1" fontWeight="bold" mb={0.5}>
                    從{getStoreName()}下載
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    在官方應用商店下載完整版本
                  </Typography>
                </Box>
                <StoreIcon color="action" />
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={handleNotNow}
          color="inherit"
          variant="outlined"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 3,
          }}
        >
          稍後提醒
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DownloadNotification;
