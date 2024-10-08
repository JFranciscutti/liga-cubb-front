import { Box, Card, Container, Grid, Tab, Tabs } from '@mui/material';
import { useParams } from 'react-router';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { PATHS } from 'src/routes/paths';
import { useAllEquiposQuery } from 'src/api/EquipoRepository';
import LoadingScreen from 'src/components/loading-screen';
import { useCampeonatoQuery } from 'src/api/CampeonatoRepository';
import { useState } from 'react';
import Iconify from 'src/components/iconify';
import { GeneroEnum } from 'src/utils/enums';

const ManageFixtureGruposCopaPage = () => {
  const params = useParams<{ id: string }>();
  const { themeStretch } = useSettingsContext();
  const { data: campeonatoData, isLoading: campeonatoLoading } = useCampeonatoQuery(
    params.id || ''
  );
  const { data: allEquipos, isLoading: allEquiposLoading } = useAllEquiposQuery();

  const [tab, setTab] = useState(grupos[0].id);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  if (campeonatoLoading || allEquiposLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${campeonatoData.name} - Fixture de fase de grupos`}
          links={[
            { name: 'Campeonatos', href: PATHS.dashboard.campeonatos.list },
            {
              name: campeonatoData.name,
              href: PATHS.dashboard.campeonatos.manage(params.id!),
            },
            { name: 'Fixture de fase de grupos' },
          ]}
        />
        <Tabs value={tab} onChange={handleChange}>
          {grupos.map((g) => (
            <Tab label={`Grupo ${g.label}`} value={g.id} />
          ))}
        </Tabs>
        {grupos.map((g) => {
          if (tab !== g.id) {
            return <></>;
          }
          return <FixtureManagerByGroup grupo={g} />;
        })}
      </Container>
    </>
  );
};

export default ManageFixtureGruposCopaPage;

const grupos: Grupo[] = [
  {
    id: 0,
    label: 'A',
    equipos: [
      {
        id: 6,
        nombre: 'LIVERFULL',
        escudo: 'https://ligacubb.com/imagenes/liverfull.png',
        genero: GeneroEnum.MASCULINO,
      },
      {
        id: 3,
        nombre: 'FUERTE AL MEDIO',
        escudo: 'https://ligacubb.com/imagenes/fuertealmedio.png',
        genero: GeneroEnum.MASCULINO,
      },
      {
        id: 7,
        nombre: 'REPO P.A.',
        escudo: 'https://ligacubb.com/imagenes/repopa.png',
        genero: GeneroEnum.MASCULINO,
      },
      {
        id: 8,
        nombre: 'BAFANGULO',
        escudo: 'https://ligacubb.com/imagenes/bafangulo.png',
        genero: GeneroEnum.MASCULINO,
      },
    ],
  },
  {
    id: 1,
    label: 'B',
    equipos: [
      {
        id: 5,
        nombre: 'ANTIDEPORTIVO CACACIOLI',
        escudo: 'https://ligacubb.com/imagenes/antideportivocacacioli.png',
        genero: GeneroEnum.MASCULINO,
      },
      {
        id: 2,
        nombre: 'RITMO Y SUSTANCIA',
        escudo: 'https://ligacubb.com/imagenes/ritmoysustancia.png',
        genero: GeneroEnum.MASCULINO,
      },
      {
        id: 14,
        nombre: 'CUALQUIER FRUTA Y/O VERDURA',
        escudo: 'https://ligacubb.com/imagenes/cualquierfrutayoverdura.png',
        genero: GeneroEnum.MASCULINO,
      },
      {
        id: 1,
        nombre: 'SIN CONTRATO',
        escudo: 'https://ligacubb.com/imagenes/sincontrato.png',
        genero: GeneroEnum.MASCULINO,
      },
    ],
  },
  {
    id: 2,
    label: 'C',
    equipos: [
      {
        id: 15,
        nombre: 'INQUI FC',
        escudo: 'https://ligacubb.com/imagenes/inquifc.png',
        genero: GeneroEnum.MASCULINO,
      },
      {
        id: 9,
        nombre: 'THE BIRDS',
        escudo: 'https://ligacubb.com/imagenes/thebirds.png',
        genero: GeneroEnum.MASCULINO,
      },
      {
        id: 12,
        nombre: 'FONDO BLANCO',
        escudo: 'https://ligacubb.com/imagenes/fondoblanco.png',
        genero: GeneroEnum.MASCULINO,
      },
      {
        id: 16,
        nombre: 'FERNETBACHE',
        escudo: 'https://ligacubb.com/imagenes/fernetbache.png',
        genero: GeneroEnum.MASCULINO,
      },
    ],
  },
  {
    id: 3,
    label: 'D',
    equipos: [
      {
        id: 13,
        nombre: 'MANDIYU´S REVENGE',
        escudo: 'https://ligacubb.com/imagenes/mandiyusrevenge.png',
        genero: GeneroEnum.MASCULINO,
      },
      {
        id: 11,
        nombre: 'LA BIGORNIA FC',
        escudo: 'https://ligacubb.com/imagenes/labigorniafc.png',
        genero: GeneroEnum.MASCULINO,
      },
      {
        id: 4,
        nombre: 'SUPERGEDIENTOS',
        escudo: 'https://ligacubb.com/imagenes/supergedientos.png',
        genero: GeneroEnum.MASCULINO,
      },
      {
        id: 10,
        nombre: 'ULTRA CUEVA FC',
        escudo: 'https://ligacubb.com/imagenes/ultracuevafc.png',
        genero: GeneroEnum.MASCULINO,
      },
    ],
  },
];
