@echo off

:: Jméno repozitáře pro --base-href
set "REPO_NAME=portfolium"
set "BUILD_CONFIG=production"

:: Dulezite: Jméno VÝSTUPNÍ SLOŽKY generované Angularem (dist\[nazev_projektu]\browser)
set "OUTPUT_FOLDER=portfolium_jb" 

set "SOURCE_DIR=dist\%OUTPUT_FOLDER%\browser"
set "TARGET_DIR=docs"

echo --- Spoustim build a nasazeni pro GitHub Pages ---

:: -----------------------------------------------------
:: Krok 1: Spusteni produkcniho buildu Angular
:: -----------------------------------------------------
echo.
echo Krok 1: Spoustim Angular build s --base-href /%REPO_NAME%/
call ng build --base-href /%REPO_NAME%/ --configuration %BUILD_CONFIG%

if errorlevel 1 (
    echo.
    echo CHYBA: Angular build selhal. Zkontrolujte vypis chyb.
    pause
    exit /b 1
)
echo.
echo Angular build dokoncen.

:: -----------------------------------------------------
:: Krok 2: Priprava a cisteni cilove slozky (docs)
:: -----------------------------------------------------
echo.
echo Krok 2: Cistim a pripravuji cilovou slozku: %TARGET_DIR%
if exist "%TARGET_DIR%" (
    rmdir /s /q "%TARGET_DIR%"
)
mkdir "%TARGET_DIR%"

:: -----------------------------------------------------
:: Krok 3: Kopirovani souboru z buildu do cilove slozky
:: -----------------------------------------------------
echo.
echo Krok 3: Kopiruji soubory z %SOURCE_DIR% do %TARGET_DIR%
xcopy "%SOURCE_DIR%" "%TARGET_DIR%" /e /i /h /y

echo.
echo ================================================
echo Nasazeni do slozky %TARGET_DIR% dokončeno!
echo Nezapomente COMMITNOUT a PUSHNOUT zmeny na GitHub.
echo ================================================
pause