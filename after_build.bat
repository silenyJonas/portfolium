@echo off
set "SOURCE_DIR=dist\portfolium_jb\browser"
set "TARGET_DIR=docs"

echo --- Pripravuji nasazeni pro GitHub Pages ---

:: Krok 1: Smazani obsahu cilove slozky (docs)
echo Cistim cilovou slozku: %TARGET_DIR%
if exist "%TARGET_DIR%" (
    rmdir /s /q "%TARGET_DIR%"
)

:: Krok 2: Vytvoreni prazdne cilove slozky
mkdir "%TARGET_DIR%"

:: Krok 3: Kopirovani souboru z buildu do cilove slozky
echo Kopiruji soubory z %SOURCE_DIR% do %TARGET_DIR%
xcopy "%SOURCE_DIR%" "%TARGET_DIR%" /e /i /h /y

echo --- Nasazeni dokončeno! ---
pause