import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
@Injectable()
export class PdfService {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.region,
      credentials: {
        accessKeyId: process.env.accessKeyid,
        secretAccessKey: process.env.secretAccessKey,
      },
    });
  }

  async listarArquivosPdf(cpf: string) {
    const command = new ListObjectsV2Command({
      Bucket: 'pdf-download-feature',
      Prefix: cpf,
    });

    const response = await this.s3.send(command);
    // console.log(response);
    // const arquivosFiltrados = response.Contents?.filter((obj) =>
    //   obj.Key.includes(cpf),
    // ).map((obj) => obj.Key);
    console.log(await this.gerarLinkAssinado(response.Contents[0].Key));
    return this.gerarLinkAssinado(response.Contents[0].Key);
  }

  async gerarLinkAssinado(key: string): Promise<string> {
    console.log(process.env.accessKeyid);
    const command = new GetObjectCommand({
      Bucket: 'pdf-download-feature',
      Key: key,
    });

    const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 }); // 1 hora de validade
    return url;
  }
}
