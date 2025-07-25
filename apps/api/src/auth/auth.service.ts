import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService
  ) {}

  private async getManagementToken() {
    const res = await this.httpService.axiosRef.post(
      `${process.env.AUTH0_ISSUER_URL}oauth/token`,
      {
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE,
        grant_type: 'client_credentials',
      }
    );

    return res.data.access_token;
  }

  async getUserInfo(token: string) {
    try {
      const res = await this.httpService.axiosRef.get(
        `${process.env.AUTH0_ISSUER_URL}userinfo`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  }

  async sendVerificationEmail(userId: string) {
    const token = await this.getManagementToken();

    const res = await this.httpService.axiosRef.post(
      `${process.env.AUTH0_AUDIENCE}jobs/verification-email`,
      { user_id: userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return res.data;
  }
}
