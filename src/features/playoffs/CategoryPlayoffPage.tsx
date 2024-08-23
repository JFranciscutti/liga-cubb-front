import { Card, Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useParams } from 'react-router';
import { PATHS } from 'src/routes/paths';
import { useCategoriaQuery } from 'src/api/CategoriaRepository';
import { useSettingsContext } from 'src/components/settings';
import LoadingScreen from 'src/components/loading-screen';
import {
  SingleEliminationBracket,
  Match,
  MATCH_STATES,
  SVGViewer,
} from '@g-loot/react-tournament-brackets';

export default function CategoriaPlayoffPage() {
  const params = useParams<{ id: string }>();
  const { themeStretch } = useSettingsContext();
  const { data: categoriaData, isLoading: categoriaLoading } = useCategoriaQuery(Number(params.id));

  if (categoriaLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Helmet>
        <title>Equipos | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading={`Playoffs - Categoria ${categoriaData.nombre}`}
          links={[
            { name: 'Listado', href: PATHS.dashboard.categorias.list },
            { name: 'Administrar', href: PATHS.dashboard.categorias.edit(Number(params.id)) },
            { name: 'Cruces playoff' },
          ]}
        />

        <Card sx={{ display: 'flex', justifyContent: 'center', py: 2, alignItems: 'center' }}>
          <SingleEliminationBracket
            matches={matches}
            matchComponent={Match}
            svgWrapper={({ children, ...props }) => (
              <SVGViewer width={10000000} height={100000} {...props}>
                {children}
              </SVGViewer>
            )}
          />
        </Card>
      </Container>
    </>
  );
}

const matches = [
  {
    id: 19874,
    name: 'Final',
    nextMatchId: null,
    nextLooserMatchId: null,
    tournamentRoundText: '6',
    startTime: '2021-05-30',
    state: 'DONE',
    participants: [
      {
        id: '354506c4-d07d-4785-9759-755941a6cccc',
        resultText: null,
        isWinner: false,
        status: null,
        name: 'TestTeam1234',
        picture: null,
      },
    ],
  },
  {
    id: 19875,
    name: 'Semi Final - Match 1',
    nextMatchId: 19874,
    nextLooserMatchId: null,
    tournamentRoundText: '5',
    startTime: '2021-05-30',
    state: 'SCHEDULED',
    participants: [
      {
        id: 'e7fe8889-13e8-46f7-8515-3c9d89c07ba1',
        resultText: null,
        isWinner: false,
        status: null,
        name: 'test87',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19906,
    name: 'Semifinal - Match 2',
    nextMatchId: 19874,
    nextLooserMatchId: null,
    tournamentRoundText: '5',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '0be9036e-4cb4-4d95-b45a-b8725b4a2b73',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'test357375',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: '354506c4-d07d-4785-9759-755941a6cccc',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'TestTeam1234',
        picture: null,
      },
    ],
  },
  {
    id: 19876,
    name: 'Cuartos de final - Match 1',
    nextMatchId: 19875,
    nextLooserMatchId: null,
    tournamentRoundText: '4',
    startTime: '2021-05-30',
    state: 'DONE',
    participants: [
      {
        id: '059743f7-9501-471e-8f9e-2d1032eccc67',
        resultText: null,
        isWinner: false,
        status: null,
        name: 'TestTeamz',
        picture: null,
      },
    ],
  },
  {
    id: 19891,
    name: 'Cuartos de final - Match 2',
    nextMatchId: 19875,
    nextLooserMatchId: null,
    tournamentRoundText: '4',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: 'e7fe8889-13e8-46f7-8515-3c9d89c07ba1',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'test87',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: 'c266ef2c-eab7-4b14-b41a-03265b6dfd74',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'adamamd',
        picture: null,
      },
    ],
  },
  {
    id: 19907,
    name: 'Cuartos de final - Match 3',
    nextMatchId: 19906,
    nextLooserMatchId: null,
    tournamentRoundText: '4',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '0be9036e-4cb4-4d95-b45a-b8725b4a2b73',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'test357375',
        picture: 'teamlogos/client_team_default_logo',
      },
      {
        id: 'de637dbe-363b-40cd-bae9-5a5e97a61ccc',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'Test Post',
        picture: 'teamlogos/client_team_default_logo',
      },
    ],
  },
  {
    id: 19922,
    name: 'Cuartos de final - Match 4',
    nextMatchId: 19906,
    nextLooserMatchId: null,
    tournamentRoundText: '4',
    startTime: '2021-05-30',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '4ce605b1-28c5-4359-a2b8-5aa232299f2e',
        resultText: 'Lost',
        isWinner: false,
        status: 'PLAYED',
        name: 'TESTWTF',
        picture: 'teamlogos/images_wstysk',
      },
      {
        id: '354506c4-d07d-4785-9759-755941a6cccc',
        resultText: 'Won',
        isWinner: true,
        status: 'PLAYED',
        name: 'TestTeam1234',
        picture: null,
      },
    ],
  },
];
