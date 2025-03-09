# 배포 환경
- EC2
    - `t2.micro` 이상
        - 단. RDS를 사용하지 않으므로 `t2.micro` 의 경우 멈출 수 있음(RAM 부족)

    - Docker 설치
        
        > Docker가 필요한 환경이면 설치
        
        1. GPG 키 및 Apt 저장소 설정
            
            ```bash
            # Add Docker's official GPG key:
            sudo apt-get update
            sudo apt-get install ca-certificates curl
            sudo install -m 0755 -d /etc/apt/keyrings
            sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
            sudo chmod a+r /etc/apt/keyrings/docker.asc
            
            # Add the repository to Apt sources:
            echo \
            "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
            $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
            sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
            
            sudo apt-get update
            ```
            
        2. Docker 설치
            
            ```bash
            sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
            ```
            
        3. Docker 사용 권한을 위한 현재 사용자를 Docker 그룹에 추가
            - `-aG` : docker 그룹에 현재 사용자 추가
            
            ```bash
            sudo usermod -aG docker $USER
            ```
            
        4. 재실행
            
            ```bash
            sudo reboot
            ```
            
        5. 설치 확인
            
            ```bash
            docker -v
            docker run hello-world
            ```
            
        6. Docker Compose 설치
            
            ```bash
            sudo curl -SL https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
            sudo chmod +x /usr/local/bin/docker-compose
            
            # 설치 확인
            docker-compose --version
            ```
        
    - SSL 인증(HTTPS)
        
        **인증서 발급**
        
        - 무료 SSL 인증서 발급 기관인 **Let's Encrypt**을 활용한다.
        1. 원격 서버 - 패키지 설치
            - certbot - Let's Encrypt 인증서 발급 도구
            
            ```bash
            sudo apt update
            sudo apt install -y certbot
            ```
            
        2. 원격 서버 - 개인 키와 인증서 생성
            
            ```bash
            sudo certbot certonly --standalone -d ***[Public IPv4]***.sslip.io
            ```
            
        3. 원격 서버 - Let’s Encrypt 인증서 발급 과정
            1. Enter email address - **`이메일 작성`**
            2. Please read the Terms of Service at - 서비스 약관 동의 여부 → **`Y`**
            3. Would you be willing, … - 뉴스레터 구독 여부 → **`N`**
            4. 인증서 생성 확인
                
                ```bash
                sudo ls /etc/letsencrypt/live/도메인/
                ```
                
                - 아래 파일 확인
                    - /etc/letsencrypt/live/**`도메인`**/privkey.pem
                    - /etc/letsencrypt/live/**`도메인`**/fullchain.pem

    - UFW(Uncomplicated Firewall) 권장
      - 방화벽 설정으로 EC2 내부에서 접근이 가능한 Port를 관리
      > 참고) AWS의 보안그룹은 EC2 외부에서 접근 가능한 Port를 관리
