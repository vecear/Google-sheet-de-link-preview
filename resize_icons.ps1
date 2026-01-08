Add-Type -AssemblyName System.Drawing

$sourcePath = "c:\Users\wseu\Desktop\Code\Google excel delink\icon_v2.png"
$sizes = @(128, 48, 16)

if (-not (Test-Path $sourcePath)) {
    Write-Error "Source file not found: $sourcePath"
    exit 1
}

$img = [System.Drawing.Image]::FromFile($sourcePath)

foreach ($size in $sizes) {
    $targetPath = "c:\Users\wseu\Desktop\Code\Google excel delink\icon$size.png"
    # Create new bitmap with target dimensions
    $rect = New-Object System.Drawing.Rectangle 0, 0, $size, $size
    $destInfo = New-Object System.Drawing.Bitmap $size, $size
    $destInfo.SetResolution($img.HorizontalResolution, $img.VerticalResolution)
    
    $graphics = [System.Drawing.Graphics]::FromImage($destInfo)
    $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    $wrapMode = [System.Drawing.Imaging.ImageAttributes]::new()
    $wrapMode.SetWrapMode([System.Drawing.Drawing2D.WrapMode]::TileFlipXY)
    
    $graphics.DrawImage($img, $rect, 0, 0, $img.Width, $img.Height, [System.Drawing.GraphicsUnit]::Pixel, $wrapMode)
    
    $destInfo.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $graphics.Dispose()
    $destInfo.Dispose()
    Write-Host "Created $targetPath"
}

$img.Dispose()
