#!/bin/bash

# Vercel 환경 변수 추가 스크립트
# 사용법: ./add-vercel-env.sh

echo "Vercel 환경 변수 추가 중..."

# 환경 변수 값 (로컬 .env.local에서 읽어옴)
GOOGLE_API_KEY="AIzaSyCUReeE6I-Mg1bBQs49tpnTIXwGD6MG6FY"
DRIVE_FOLDER_ID="1lM28bdwDO5QaKlrqMW2uNHiXh1_gk7oT"

# Vercel에 환경 변수 추가
echo "GOOGLE_API_KEY 추가 중..."
vercel env add GOOGLE_API_KEY production preview development <<EOF
${GOOGLE_API_KEY}
EOF

echo ""
echo "DRIVE_FOLDER_ID 추가 중..."
vercel env add DRIVE_FOLDER_ID production preview development <<EOF
${DRIVE_FOLDER_ID}
EOF

echo ""
echo "환경 변수 추가 완료!"
echo "다음 명령어로 확인하세요: vercel env ls"
