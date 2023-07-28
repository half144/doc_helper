import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Header,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  LevelFormat,
  ImageRun,
} from 'docx';
import { saveAs } from 'file-saver';

const LINE_BREAK = () =>
  new Paragraph({
    children: [
      new TextRun({
        text: ' ',
      }),
    ],
  });

const createScenariosEsperados = (scenarios) => {
  return scenarios.scenarios.map(
    (scenario) =>
      new Paragraph({
        numbering: {
          reference: 'my-numbering-reference',
          level: 1,
        },
        children: [
          new TextRun({
            text: scenario.testcaseName,
            bold: true,
          }),
        ],
      })
  );
};

const createSceariosDescritos = (scenarios) => {
  const scenariosEsperados = scenarios.scenarios.flatMap((scenario) => [
    new Paragraph({
      numbering: {
        reference: 'my-numbering-reference-2',
        level: 1,
      },
      children: [
        new TextRun({
          text: scenario.testcaseName,
          bold: true,
        }),
      ],
    }),
    LINE_BREAK(),
    new Paragraph({
      text: `Dado ${scenario.testcaseDescription.dado};`,
      bullet: {
        level: 2,
      },
    }),
    new Paragraph({
      text: `Quando ${scenario.testcaseDescription.quando};`,
      bullet: {
        level: 2,
      },
    }),
    new Paragraph({
      text: `Então ${scenario.testcaseDescription.entao}.`,
      bullet: {
        level: 2,
      },
    }),
    LINE_BREAK(),
  ]);

  return scenariosEsperados;
};

const createCenariosDoc = (cenario, ibmLogo) => {
  return new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Calibri',
          },
        },
      },
    },
    numbering: {
      config: [
        {
          reference: 'my-numbering-reference',
          levels: [
            {
              level: 0,
              format: LevelFormat.UPPER_ROMAN,
              text: '%1',
              alignment: AlignmentType.START,
              style: {
                paragraph: {
                  indent: { left: 1440, hanging: 300 },
                },
              },
            },
            {
              level: 1,
              format: LevelFormat.DECIMAL,
              text: '%2.',
              alignment: AlignmentType.START,
              style: {
                paragraph: {
                  indent: { left: 1440, hanging: 300 },
                },
              },
            },
            {
              level: 2,
              format: LevelFormat.LOWER_LETTER,
              text: '%3)',
              alignment: AlignmentType.START,
              style: {
                paragraph: {
                  indent: { left: 1440, hanging: 300 },
                },
              },
            },
            {
              level: 3,
              format: LevelFormat.UPPER_LETTER,
              text: '%4)',
              alignment: AlignmentType.START,
              style: {
                paragraph: {
                  indent: { left: 1440, hanging: 300 },
                },
              },
            },
          ],
        },
        {
          reference: 'my-numbering-reference-2',
          levels: [
            {
              level: 0,
              format: LevelFormat.UPPER_ROMAN,
              text: '%1',
              alignment: AlignmentType.START,
              style: {
                paragraph: {
                  indent: { left: 1440, hanging: 300 },
                },
              },
            },
            {
              level: 1,
              format: LevelFormat.DECIMAL,
              text: '%2.',
              alignment: AlignmentType.START,
              style: {
                paragraph: {
                  indent: { left: 1440, hanging: 300 },
                },
              },
            },
            {
              level: 2,
              format: LevelFormat.LOWER_LETTER,
              text: '%3)',
              alignment: AlignmentType.START,
              style: {
                paragraph: {
                  indent: { left: 1440, hanging: 300 },
                },
              },
            },
            {
              level: 3,
              format: LevelFormat.UPPER_LETTER,
              text: '%4)',
              alignment: AlignmentType.START,
              style: {
                paragraph: {
                  indent: { left: 1440, hanging: 300 },
                },
              },
            },
          ],
        },
      ],
    },
    sections: [
      {
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new ImageRun({
                    data: ibmLogo,
                    transformation: {
                      width: 100,
                      height: 40,
                    },
                  }),
                ],
              }),
              LINE_BREAK(),
              LINE_BREAK(),
              new Table({
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        margins: {
                          left: 100,
                          right: 100,
                        },
                        width: {
                          size: 4505,
                          type: WidthType.DXA,
                        },
                        children: [new Paragraph('Tipo de documento:')],
                      }),
                      new TableCell({
                        margins: {
                          left: 100,
                          right: 100,
                        },
                        width: {
                          size: 4505,
                          type: WidthType.DXA,
                        },
                        children: [new Paragraph('Cenário de testes')],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        margins: {
                          left: 100,
                          right: 100,
                        },
                        children: [new Paragraph('Sprint de Atendimento:')],
                      }),
                      new TableCell({
                        margins: {
                          left: 100,
                          right: 100,
                        },
                        children: [new Paragraph(cenario.sprint)],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        margins: {
                          left: 100,
                          right: 100,
                        },
                        children: [new Paragraph('Card:')],
                      }),
                      new TableCell({
                        margins: {
                          left: 100,
                          right: 100,
                        },
                        children: [
                          new Paragraph(`Card INIBCSD-${cenario.cardNumber}`),
                        ],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        margins: {
                          left: 100,
                          right: 100,
                        },
                        children: [new Paragraph('Desenvolvedor:')],
                      }),
                      new TableCell({
                        margins: {
                          left: 100,
                          right: 100,
                        },
                        children: [new Paragraph(cenario.cardHolder)],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        margins: {
                          left: 100,
                          right: 100,
                        },
                        children: [new Paragraph('Testador:')],
                      }),
                      new TableCell({
                        margins: {
                          left: 100,
                          right: 100,
                        },
                        children: [new Paragraph(cenario.cardReviwer)],
                      }),
                    ],
                  }),
                ],
              }),
              LINE_BREAK(),
            ],
          }),
        },
        properties: {},
        children: [
          LINE_BREAK(),
          LINE_BREAK(),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Documento de cenários de Testes do Card INIBCSD-${cenario.cardNumber}`,
                bold: true,
                size: 22,
              }),
            ],
          }),
          LINE_BREAK(),
          LINE_BREAK(),
          LINE_BREAK(),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Objetivo do card: ',
                bold: true,
                size: 22,
              }),
              new TextRun({
                text: cenario.cardDescription,
                size: 22,
              }),
            ],
          }),
          LINE_BREAK(),
          new Paragraph({
            bullet: {
              level: 0,
            },
            children: [
              new TextRun({
                text: 'Cenários esperados',
                size: 22,
                bold: true,
              }),
            ],
          }),
          LINE_BREAK(),
          ...createScenariosEsperados(cenario),
          LINE_BREAK(),
          new Paragraph({
            bullet: {
              level: 0,
            },
            children: [
              new TextRun({
                text: 'Cenários descritos',
                size: 22,
                bold: true,
              }),
            ],
          }),
          LINE_BREAK(),
          ...createSceariosDescritos(cenario),
        ],
      },
    ],
  });
};

export const generateBufferDocxCenario = async (cenario) => {
  const blobIBMLogo = await fetch(
    'https://doc-helper.vercel.app/assets/IBM.png'
  ).then((r) => r.blob());
  const doc = createCenariosDoc(cenario, blobIBMLogo);

  const buffer = await Packer.toBuffer(doc);
  return buffer;
};

export const downloadScenariosDocx = async (cenario) => {
  const blobIBMLogo = await fetch(
    'https://doc-helper.vercel.app/assets/IBM.png'
  ).then((r) => r.blob());

  const doc = createCenariosDoc(cenario, blobIBMLogo);
  const blob = await Packer.toBlob(doc);
  const docTitle = `Cenários CARD INIBCSD-${cenario.cardNumber}`;

  saveAs(blob, `${docTitle}.docx`);
};
