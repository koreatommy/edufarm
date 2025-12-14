#!/bin/bash

# Vercel 환경 변수 자동 추가 스크립트
# 사용법: ./setup-vercel-env.sh

set -e

echo "=========================================="
echo "Vercel 환경 변수 설정"
echo "=========================================="
echo ""

# 로그인 확인
if ! vercel whoami &>/dev/null; then
    echo "⚠️  Vercel에 로그인되어 있지 않습니다."
    echo "브라우저에서 로그인을 진행합니다..."
    echo ""
    vercel login
    echo ""
fi

# 프로젝트 확인
echo "프로젝트 연결 확인 중..."
if ! vercel link --yes &>/dev/null; then
    echo "프로젝트를 연결합니다..."
    vercel link
fi

echo ""
echo "환경 변수 추가 중..."
echo ""

# GOOGLE_API_KEY 추가
echo "1️⃣  GOOGLE_API_KEY 추가 중..."
echo "AIzaSyCUReeE6I-Mg1bBQs49tpnTIXwGD6MG6FY" | vercel env add GOOGLE_API_KEY production preview development

echo ""
echo "2️⃣  DRIVE_FOLDER_ID 추가 중..."
echo "1lM28bdwDO5QaKlrqMW2uNHiXh1_gk7oT" | vercel env add DRIVE_FOLDER_ID production preview development

echo ""
echo "=========================================="
echo "✅ 환경 변수 추가 완료!"
echo "=========================================="
echo ""
echo "추가된 환경 변수 확인:"
vercel env ls

echo ""
echo "🎉 완료! 이제 Vercel에서 재배포하면 환경 변수가 적용됩니다."
