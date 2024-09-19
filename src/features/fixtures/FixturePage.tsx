import { Card, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useNavigate, useParams } from 'react-router';
import { PATHS } from 'src/routes/paths';
import { Fecha } from 'src/hooks/useGenerateEquipos';
import { GeneroEnum } from 'src/utils/enums';
import CreateFixture from './CreateFixtureV1';
import { useSaveFaseMutation } from 'src/api/CategoriaRepository';
import { useAllEquiposByCategory } from 'src/api/EquipoRepository';
import { enqueueSnackbar } from 'notistack';

export default function FixturePage() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: allEquipos,
    isLoading: allEquiposLoading,
    isError: allEquiposError,
    refetch,
  } = useAllEquiposByCategory(params.id || '');

  const saveFaseMutation = useSaveFaseMutation();

  const handleSave = async (fechas: any[]) => {
    await saveFaseMutation.mutateAsync({ fechas: fechas, categoryId: params.id || '' });
    enqueueSnackbar({ message: 'Fase creada con éxito', variant: 'success' });
    navigate(-1);
  };

  return (
    <>
      <Helmet>
        <title>Equipos | LIGA CUBB</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading={`Fixture - Categoria`}
          links={[
            { name: 'Listado', href: PATHS.dashboard.categorias.list },
            { name: 'Administrar', href: PATHS.dashboard.categorias.edit(params.id || '') },
            { name: 'Fixture' },
          ]}
        />

        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CreateFixture equipos={allEquipos.teams || []} handleSave={handleSave} />
          {/* <EditCreatedFixture fechas={fechas} /> */}
        </Card>
      </Container>
    </>
  );
}

const fechas: Fecha[] = [
  {
    id: 1,
    title: 'Fecha 1',
    partidos: [
      {
        equipoLocal: {
          id: '1',
          name: 'SIN CONTRATO',
          logoUrl: 'https://ligacubb.com/imagenes/sincontrato.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '2',
          name: 'RITMO Y SUSTANCIA',
          logoUrl: 'https://ligacubb.com/imagenes/ritmoysustancia.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '3',
          name: 'FUERTE AL MEDIO',
          logoUrl: 'https://ligacubb.com/imagenes/fuertealmedio.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '4',
          name: 'SUPERGEDIENTOS',
          logoUrl: 'https://ligacubb.com/imagenes/supergedientos.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '5',
          name: 'ANTIDEPORTIVO CACACIOLI',
          logoUrl: 'https://ligacubb.com/imagenes/antideportivocacacioli.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '6',
          name: 'LIVERFULL',
          logoUrl: 'https://ligacubb.com/imagenes/liverfull.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '7',
          name: 'REPO P.A.',
          logoUrl: 'https://ligacubb.com/imagenes/repopa.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '8',
          name: 'BAFANGULO',
          logoUrl: 'https://ligacubb.com/imagenes/bafangulo.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '9',
          name: 'THE BIRDS',
          logoUrl: 'https://ligacubb.com/imagenes/thebirds.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '10',
          name: 'ULTRA CUEVA FC',
          logoUrl: 'https://ligacubb.com/imagenes/ultracuevafc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '11',
          name: 'LA BIGORNIA FC',
          logoUrl: 'https://ligacubb.com/imagenes/labigorniafc.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '12',
          name: 'FONDO BLANCO',
          logoUrl: 'https://ligacubb.com/imagenes/fondoblanco.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '13',
          name: 'MANDIYU´S REVENGE',
          logoUrl: 'https://ligacubb.com/imagenes/mandiyusrevenge.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '14',
          name: 'CUALQUIER FRUTA Y/O VERDURA',
          logoUrl: 'https://ligacubb.com/imagenes/cualquierfrutayoverdura.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '15',
          name: 'INQUI FC',
          logoUrl: 'https://ligacubb.com/imagenes/inquifc.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '16',
          name: 'FERNETBACHE',
          logoUrl: 'https://ligacubb.com/imagenes/fernetbache.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
    ],
  },
  {
    id: 2,
    title: 'Fecha 2',
    partidos: [
      {
        equipoLocal: {
          id: '1',
          name: 'SIN CONTRATO',
          logoUrl: 'https://ligacubb.com/imagenes/sincontrato.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '3',
          name: 'FUERTE AL MEDIO',
          logoUrl: 'https://ligacubb.com/imagenes/fuertealmedio.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '2',
          name: 'RITMO Y SUSTANCIA',
          logoUrl: 'https://ligacubb.com/imagenes/ritmoysustancia.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '4',
          name: 'SUPERGEDIENTOS',
          logoUrl: 'https://ligacubb.com/imagenes/supergedientos.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '5',
          name: 'ANTIDEPORTIVO CACACIOLI',
          logoUrl: 'https://ligacubb.com/imagenes/antideportivocacacioli.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '7',
          name: 'REPO P.A.',
          logoUrl: 'https://ligacubb.com/imagenes/repopa.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '6',
          name: 'LIVERFULL',
          logoUrl: 'https://ligacubb.com/imagenes/liverfull.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '8',
          name: 'BAFANGULO',
          logoUrl: 'https://ligacubb.com/imagenes/bafangulo.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '9',
          name: 'THE BIRDS',
          logoUrl: 'https://ligacubb.com/imagenes/thebirds.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '11',
          name: 'LA BIGORNIA FC',
          logoUrl: 'https://ligacubb.com/imagenes/labigorniafc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '10',
          name: 'ULTRA CUEVA FC',
          logoUrl: 'https://ligacubb.com/imagenes/ultracuevafc.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '12',
          name: 'FONDO BLANCO',
          logoUrl: 'https://ligacubb.com/imagenes/fondoblanco.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '13',
          name: 'MANDIYU´S REVENGE',
          logoUrl: 'https://ligacubb.com/imagenes/mandiyusrevenge.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '15',
          name: 'INQUI FC',
          logoUrl: 'https://ligacubb.com/imagenes/inquifc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '14',
          name: 'CUALQUIER FRUTA Y/O VERDURA',
          logoUrl: 'https://ligacubb.com/imagenes/cualquierfrutayoverdura.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '16',
          name: 'FERNETBACHE',
          logoUrl: 'https://ligacubb.com/imagenes/fernetbache.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
    ],
  },
  {
    id: 3,
    title: 'Fecha 3',
    partidos: [
      {
        equipoLocal: {
          id: '1',
          name: 'SIN CONTRATO',
          logoUrl: 'https://ligacubb.com/imagenes/sincontrato.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '4',
          name: 'SUPERGEDIENTOS',
          logoUrl: 'https://ligacubb.com/imagenes/supergedientos.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '2',
          name: 'RITMO Y SUSTANCIA',
          logoUrl: 'https://ligacubb.com/imagenes/ritmoysustancia.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '3',
          name: 'FUERTE AL MEDIO',
          logoUrl: 'https://ligacubb.com/imagenes/fuertealmedio.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '5',
          name: 'ANTIDEPORTIVO CACACIOLI',
          logoUrl: 'https://ligacubb.com/imagenes/antideportivocacacioli.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '8',
          name: 'BAFANGULO',
          logoUrl: 'https://ligacubb.com/imagenes/bafangulo.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '6',
          name: 'LIVERFULL',
          logoUrl: 'https://ligacubb.com/imagenes/liverfull.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '7',
          name: 'REPO P.A.',
          logoUrl: 'https://ligacubb.com/imagenes/repopa.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '9',
          name: 'THE BIRDS',
          logoUrl: 'https://ligacubb.com/imagenes/thebirds.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '12',
          name: 'FONDO BLANCO',
          logoUrl: 'https://ligacubb.com/imagenes/fondoblanco.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '10',
          name: 'ULTRA CUEVA FC',
          logoUrl: 'https://ligacubb.com/imagenes/ultracuevafc.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '11',
          name: 'LA BIGORNIA FC',
          logoUrl: 'https://ligacubb.com/imagenes/labigorniafc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '13',
          name: 'MANDIYU´S REVENGE',
          logoUrl: 'https://ligacubb.com/imagenes/mandiyusrevenge.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '16',
          name: 'FERNETBACHE',
          logoUrl: 'https://ligacubb.com/imagenes/fernetbache.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '14',
          name: 'CUALQUIER FRUTA Y/O VERDURA',
          logoUrl: 'https://ligacubb.com/imagenes/cualquierfrutayoverdura.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '15',
          name: 'INQUI FC',
          logoUrl: 'https://ligacubb.com/imagenes/inquifc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
    ],
  },
  {
    id: 4,
    title: 'Fecha 4',
    partidos: [
      {
        equipoLocal: {
          id: '1',
          name: 'SIN CONTRATO',
          logoUrl: 'https://ligacubb.com/imagenes/sincontrato.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '5',
          name: 'ANTIDEPORTIVO CACACIOLI',
          logoUrl: 'https://ligacubb.com/imagenes/antideportivocacacioli.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '2',
          name: 'RITMO Y SUSTANCIA',
          logoUrl: 'https://ligacubb.com/imagenes/ritmoysustancia.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '6',
          name: 'LIVERFULL',
          logoUrl: 'https://ligacubb.com/imagenes/liverfull.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '3',
          name: 'FUERTE AL MEDIO',
          logoUrl: 'https://ligacubb.com/imagenes/fuertealmedio.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '7',
          name: 'REPO P.A.',
          logoUrl: 'https://ligacubb.com/imagenes/repopa.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '4',
          name: 'SUPERGEDIENTOS',
          logoUrl: 'https://ligacubb.com/imagenes/supergedientos.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '8',
          name: 'BAFANGULO',
          logoUrl: 'https://ligacubb.com/imagenes/bafangulo.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '9',
          name: 'THE BIRDS',
          logoUrl: 'https://ligacubb.com/imagenes/thebirds.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '13',
          name: 'MANDIYU´S REVENGE',
          logoUrl: 'https://ligacubb.com/imagenes/mandiyusrevenge.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '10',
          name: 'ULTRA CUEVA FC',
          logoUrl: 'https://ligacubb.com/imagenes/ultracuevafc.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '14',
          name: 'CUALQUIER FRUTA Y/O VERDURA',
          logoUrl: 'https://ligacubb.com/imagenes/cualquierfrutayoverdura.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '11',
          name: 'LA BIGORNIA FC',
          logoUrl: 'https://ligacubb.com/imagenes/labigorniafc.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '15',
          name: 'INQUI FC',
          logoUrl: 'https://ligacubb.com/imagenes/inquifc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '12',
          name: 'FONDO BLANCO',
          logoUrl: 'https://ligacubb.com/imagenes/fondoblanco.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '16',
          name: 'FERNETBACHE',
          logoUrl: 'https://ligacubb.com/imagenes/fernetbache.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
    ],
  },
  {
    id: 5,
    title: 'Fecha 5',
    partidos: [
      {
        equipoLocal: {
          id: '1',
          name: 'SIN CONTRATO',
          logoUrl: 'https://ligacubb.com/imagenes/sincontrato.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '6',
          name: 'LIVERFULL',
          logoUrl: 'https://ligacubb.com/imagenes/liverfull.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '2',
          name: 'RITMO Y SUSTANCIA',
          logoUrl: 'https://ligacubb.com/imagenes/ritmoysustancia.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '5',
          name: 'ANTIDEPORTIVO CACACIOLI',
          logoUrl: 'https://ligacubb.com/imagenes/antideportivocacacioli.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '3',
          name: 'FUERTE AL MEDIO',
          logoUrl: 'https://ligacubb.com/imagenes/fuertealmedio.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '8',
          name: 'BAFANGULO',
          logoUrl: 'https://ligacubb.com/imagenes/bafangulo.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '4',
          name: 'SUPERGEDIENTOS',
          logoUrl: 'https://ligacubb.com/imagenes/supergedientos.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '7',
          name: 'REPO P.A.',
          logoUrl: 'https://ligacubb.com/imagenes/repopa.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '9',
          name: 'THE BIRDS',
          logoUrl: 'https://ligacubb.com/imagenes/thebirds.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '14',
          name: 'CUALQUIER FRUTA Y/O VERDURA',
          logoUrl: 'https://ligacubb.com/imagenes/cualquierfrutayoverdura.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '10',
          name: 'ULTRA CUEVA FC',
          logoUrl: 'https://ligacubb.com/imagenes/ultracuevafc.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '13',
          name: 'MANDIYU´S REVENGE',
          logoUrl: 'https://ligacubb.com/imagenes/mandiyusrevenge.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '11',
          name: 'LA BIGORNIA FC',
          logoUrl: 'https://ligacubb.com/imagenes/labigorniafc.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '16',
          name: 'FERNETBACHE',
          logoUrl: 'https://ligacubb.com/imagenes/fernetbache.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '12',
          name: 'FONDO BLANCO',
          logoUrl: 'https://ligacubb.com/imagenes/fondoblanco.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '15',
          name: 'INQUI FC',
          logoUrl: 'https://ligacubb.com/imagenes/inquifc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
    ],
  },
  {
    id: 6,
    title: 'Fecha 6',
    partidos: [
      {
        equipoLocal: {
          id: '1',
          name: 'SIN CONTRATO',
          logoUrl: 'https://ligacubb.com/imagenes/sincontrato.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '7',
          name: 'REPO P.A.',
          logoUrl: 'https://ligacubb.com/imagenes/repopa.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '2',
          name: 'RITMO Y SUSTANCIA',
          logoUrl: 'https://ligacubb.com/imagenes/ritmoysustancia.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '8',
          name: 'BAFANGULO',
          logoUrl: 'https://ligacubb.com/imagenes/bafangulo.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '3',
          name: 'FUERTE AL MEDIO',
          logoUrl: 'https://ligacubb.com/imagenes/fuertealmedio.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '5',
          name: 'ANTIDEPORTIVO CACACIOLI',
          logoUrl: 'https://ligacubb.com/imagenes/antideportivocacacioli.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '4',
          name: 'SUPERGEDIENTOS',
          logoUrl: 'https://ligacubb.com/imagenes/supergedientos.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '6',
          name: 'LIVERFULL',
          logoUrl: 'https://ligacubb.com/imagenes/liverfull.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '9',
          name: 'THE BIRDS',
          logoUrl: 'https://ligacubb.com/imagenes/thebirds.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '15',
          name: 'INQUI FC',
          logoUrl: 'https://ligacubb.com/imagenes/inquifc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '10',
          name: 'ULTRA CUEVA FC',
          logoUrl: 'https://ligacubb.com/imagenes/ultracuevafc.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '16',
          name: 'FERNETBACHE',
          logoUrl: 'https://ligacubb.com/imagenes/fernetbache.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '11',
          name: 'LA BIGORNIA FC',
          logoUrl: 'https://ligacubb.com/imagenes/labigorniafc.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '13',
          name: 'MANDIYU´S REVENGE',
          logoUrl: 'https://ligacubb.com/imagenes/mandiyusrevenge.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '12',
          name: 'FONDO BLANCO',
          logoUrl: 'https://ligacubb.com/imagenes/fondoblanco.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '14',
          name: 'CUALQUIER FRUTA Y/O VERDURA',
          logoUrl: 'https://ligacubb.com/imagenes/cualquierfrutayoverdura.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
    ],
  },
  {
    id: 7,
    title: 'Fecha 7',
    partidos: [
      {
        equipoLocal: {
          id: '1',
          name: 'SIN CONTRATO',
          logoUrl: 'https://ligacubb.com/imagenes/sincontrato.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '8',
          name: 'BAFANGULO',
          logoUrl: 'https://ligacubb.com/imagenes/bafangulo.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '2',
          name: 'RITMO Y SUSTANCIA',
          logoUrl: 'https://ligacubb.com/imagenes/ritmoysustancia.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '7',
          name: 'REPO P.A.',
          logoUrl: 'https://ligacubb.com/imagenes/repopa.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '3',
          name: 'FUERTE AL MEDIO',
          logoUrl: 'https://ligacubb.com/imagenes/fuertealmedio.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '6',
          name: 'LIVERFULL',
          logoUrl: 'https://ligacubb.com/imagenes/liverfull.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '4',
          name: 'SUPERGEDIENTOS',
          logoUrl: 'https://ligacubb.com/imagenes/supergedientos.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '5',
          name: 'ANTIDEPORTIVO CACACIOLI',
          logoUrl: 'https://ligacubb.com/imagenes/antideportivocacacioli.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '9',
          name: 'THE BIRDS',
          logoUrl: 'https://ligacubb.com/imagenes/thebirds.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '16',
          name: 'FERNETBACHE',
          logoUrl: 'https://ligacubb.com/imagenes/fernetbache.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '10',
          name: 'ULTRA CUEVA FC',
          logoUrl: 'https://ligacubb.com/imagenes/ultracuevafc.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '15',
          name: 'INQUI FC',
          logoUrl: 'https://ligacubb.com/imagenes/inquifc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '11',
          name: 'LA BIGORNIA FC',
          logoUrl: 'https://ligacubb.com/imagenes/labigorniafc.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '14',
          name: 'CUALQUIER FRUTA Y/O VERDURA',
          logoUrl: 'https://ligacubb.com/imagenes/cualquierfrutayoverdura.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '12',
          name: 'FONDO BLANCO',
          logoUrl: 'https://ligacubb.com/imagenes/fondoblanco.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '13',
          name: 'MANDIYU´S REVENGE',
          logoUrl: 'https://ligacubb.com/imagenes/mandiyusrevenge.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
    ],
  },
  {
    id: 8,
    title: 'Fecha 8',
    partidos: [
      {
        equipoLocal: {
          id: '1',
          name: 'SIN CONTRATO',
          logoUrl: 'https://ligacubb.com/imagenes/sincontrato.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '9',
          name: 'THE BIRDS',
          logoUrl: 'https://ligacubb.com/imagenes/thebirds.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '2',
          name: 'RITMO Y SUSTANCIA',
          logoUrl: 'https://ligacubb.com/imagenes/ritmoysustancia.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '10',
          name: 'ULTRA CUEVA FC',
          logoUrl: 'https://ligacubb.com/imagenes/ultracuevafc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '3',
          name: 'FUERTE AL MEDIO',
          logoUrl: 'https://ligacubb.com/imagenes/fuertealmedio.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '11',
          name: 'LA BIGORNIA FC',
          logoUrl: 'https://ligacubb.com/imagenes/labigorniafc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '4',
          name: 'SUPERGEDIENTOS',
          logoUrl: 'https://ligacubb.com/imagenes/supergedientos.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '12',
          name: 'FONDO BLANCO',
          logoUrl: 'https://ligacubb.com/imagenes/fondoblanco.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '5',
          name: 'ANTIDEPORTIVO CACACIOLI',
          logoUrl: 'https://ligacubb.com/imagenes/antideportivocacacioli.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '13',
          name: 'MANDIYU´S REVENGE',
          logoUrl: 'https://ligacubb.com/imagenes/mandiyusrevenge.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '6',
          name: 'LIVERFULL',
          logoUrl: 'https://ligacubb.com/imagenes/liverfull.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '14',
          name: 'CUALQUIER FRUTA Y/O VERDURA',
          logoUrl: 'https://ligacubb.com/imagenes/cualquierfrutayoverdura.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '7',
          name: 'REPO P.A.',
          logoUrl: 'https://ligacubb.com/imagenes/repopa.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '15',
          name: 'INQUI FC',
          logoUrl: 'https://ligacubb.com/imagenes/inquifc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '8',
          name: 'BAFANGULO',
          logoUrl: 'https://ligacubb.com/imagenes/bafangulo.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '16',
          name: 'FERNETBACHE',
          logoUrl: 'https://ligacubb.com/imagenes/fernetbache.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
    ],
  },
  {
    id: 9,
    title: 'Fecha 9',
    partidos: [
      {
        equipoLocal: {
          id: '1',
          name: 'SIN CONTRATO',
          logoUrl: 'https://ligacubb.com/imagenes/sincontrato.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '10',
          name: 'ULTRA CUEVA FC',
          logoUrl: 'https://ligacubb.com/imagenes/ultracuevafc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '2',
          name: 'RITMO Y SUSTANCIA',
          logoUrl: 'https://ligacubb.com/imagenes/ritmoysustancia.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '9',
          name: 'THE BIRDS',
          logoUrl: 'https://ligacubb.com/imagenes/thebirds.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '3',
          name: 'FUERTE AL MEDIO',
          logoUrl: 'https://ligacubb.com/imagenes/fuertealmedio.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '12',
          name: 'FONDO BLANCO',
          logoUrl: 'https://ligacubb.com/imagenes/fondoblanco.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '4',
          name: 'SUPERGEDIENTOS',
          logoUrl: 'https://ligacubb.com/imagenes/supergedientos.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '11',
          name: 'LA BIGORNIA FC',
          logoUrl: 'https://ligacubb.com/imagenes/labigorniafc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '5',
          name: 'ANTIDEPORTIVO CACACIOLI',
          logoUrl: 'https://ligacubb.com/imagenes/antideportivocacacioli.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '14',
          name: 'CUALQUIER FRUTA Y/O VERDURA',
          logoUrl: 'https://ligacubb.com/imagenes/cualquierfrutayoverdura.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '6',
          name: 'LIVERFULL',
          logoUrl: 'https://ligacubb.com/imagenes/liverfull.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '13',
          name: 'MANDIYU´S REVENGE',
          logoUrl: 'https://ligacubb.com/imagenes/mandiyusrevenge.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '7',
          name: 'REPO P.A.',
          logoUrl: 'https://ligacubb.com/imagenes/repopa.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '16',
          name: 'FERNETBACHE',
          logoUrl: 'https://ligacubb.com/imagenes/fernetbache.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '8',
          name: 'BAFANGULO',
          logoUrl: 'https://ligacubb.com/imagenes/bafangulo.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '15',
          name: 'INQUI FC',
          logoUrl: 'https://ligacubb.com/imagenes/inquifc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
    ],
  },
  {
    id: 10,
    title: 'Fecha 10',
    partidos: [
      {
        equipoLocal: {
          id: '1',
          name: 'SIN CONTRATO',
          logoUrl: 'https://ligacubb.com/imagenes/sincontrato.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '11',
          name: 'LA BIGORNIA FC',
          logoUrl: 'https://ligacubb.com/imagenes/labigorniafc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '2',
          name: 'RITMO Y SUSTANCIA',
          logoUrl: 'https://ligacubb.com/imagenes/ritmoysustancia.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '12',
          name: 'FONDO BLANCO',
          logoUrl: 'https://ligacubb.com/imagenes/fondoblanco.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '3',
          name: 'FUERTE AL MEDIO',
          logoUrl: 'https://ligacubb.com/imagenes/fuertealmedio.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '9',
          name: 'THE BIRDS',
          logoUrl: 'https://ligacubb.com/imagenes/thebirds.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '4',
          name: 'SUPERGEDIENTOS',
          logoUrl: 'https://ligacubb.com/imagenes/supergedientos.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '10',
          name: 'ULTRA CUEVA FC',
          logoUrl: 'https://ligacubb.com/imagenes/ultracuevafc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '5',
          name: 'ANTIDEPORTIVO CACACIOLI',
          logoUrl: 'https://ligacubb.com/imagenes/antideportivocacacioli.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '15',
          name: 'INQUI FC',
          logoUrl: 'https://ligacubb.com/imagenes/inquifc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '6',
          name: 'LIVERFULL',
          logoUrl: 'https://ligacubb.com/imagenes/liverfull.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '16',
          name: 'FERNETBACHE',
          logoUrl: 'https://ligacubb.com/imagenes/fernetbache.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '7',
          name: 'REPO P.A.',
          logoUrl: 'https://ligacubb.com/imagenes/repopa.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '13',
          name: 'MANDIYU´S REVENGE',
          logoUrl: 'https://ligacubb.com/imagenes/mandiyusrevenge.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '8',
          name: 'BAFANGULO',
          logoUrl: 'https://ligacubb.com/imagenes/bafangulo.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '14',
          name: 'CUALQUIER FRUTA Y/O VERDURA',
          logoUrl: 'https://ligacubb.com/imagenes/cualquierfrutayoverdura.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
    ],
  },
  {
    id: 11,
    title: 'Fecha 11',
    partidos: [
      {
        equipoLocal: {
          id: '1',
          name: 'SIN CONTRATO',
          logoUrl: 'https://ligacubb.com/imagenes/sincontrato.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '12',
          name: 'FONDO BLANCO',
          logoUrl: 'https://ligacubb.com/imagenes/fondoblanco.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '2',
          name: 'RITMO Y SUSTANCIA',
          logoUrl: 'https://ligacubb.com/imagenes/ritmoysustancia.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '11',
          name: 'LA BIGORNIA FC',
          logoUrl: 'https://ligacubb.com/imagenes/labigorniafc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '3',
          name: 'FUERTE AL MEDIO',
          logoUrl: 'https://ligacubb.com/imagenes/fuertealmedio.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '10',
          name: 'ULTRA CUEVA FC',
          logoUrl: 'https://ligacubb.com/imagenes/ultracuevafc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '4',
          name: 'SUPERGEDIENTOS',
          logoUrl: 'https://ligacubb.com/imagenes/supergedientos.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '9',
          name: 'THE BIRDS',
          logoUrl: 'https://ligacubb.com/imagenes/thebirds.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '5',
          name: 'ANTIDEPORTIVO CACACIOLI',
          logoUrl: 'https://ligacubb.com/imagenes/antideportivocacacioli.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '16',
          name: 'FERNETBACHE',
          logoUrl: 'https://ligacubb.com/imagenes/fernetbache.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '6',
          name: 'LIVERFULL',
          logoUrl: 'https://ligacubb.com/imagenes/liverfull.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '15',
          name: 'INQUI FC',
          logoUrl: 'https://ligacubb.com/imagenes/inquifc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '7',
          name: 'REPO P.A.',
          logoUrl: 'https://ligacubb.com/imagenes/repopa.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '14',
          name: 'CUALQUIER FRUTA Y/O VERDURA',
          logoUrl: 'https://ligacubb.com/imagenes/cualquierfrutayoverdura.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '8',
          name: 'BAFANGULO',
          logoUrl: 'https://ligacubb.com/imagenes/bafangulo.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '13',
          name: 'MANDIYU´S REVENGE',
          logoUrl: 'https://ligacubb.com/imagenes/mandiyusrevenge.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
    ],
  },
  {
    id: 12,
    title: 'Fecha 12',
    partidos: [
      {
        equipoLocal: {
          id: '1',
          name: 'SIN CONTRATO',
          logoUrl: 'https://ligacubb.com/imagenes/sincontrato.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '13',
          name: 'MANDIYU´S REVENGE',
          logoUrl: 'https://ligacubb.com/imagenes/mandiyusrevenge.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '2',
          name: 'RITMO Y SUSTANCIA',
          logoUrl: 'https://ligacubb.com/imagenes/ritmoysustancia.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '14',
          name: 'CUALQUIER FRUTA Y/O VERDURA',
          logoUrl: 'https://ligacubb.com/imagenes/cualquierfrutayoverdura.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '3',
          name: 'FUERTE AL MEDIO',
          logoUrl: 'https://ligacubb.com/imagenes/fuertealmedio.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '15',
          name: 'INQUI FC',
          logoUrl: 'https://ligacubb.com/imagenes/inquifc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '4',
          name: 'SUPERGEDIENTOS',
          logoUrl: 'https://ligacubb.com/imagenes/supergedientos.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '16',
          name: 'FERNETBACHE',
          logoUrl: 'https://ligacubb.com/imagenes/fernetbache.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '5',
          name: 'ANTIDEPORTIVO CACACIOLI',
          logoUrl: 'https://ligacubb.com/imagenes/antideportivocacacioli.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '9',
          name: 'THE BIRDS',
          logoUrl: 'https://ligacubb.com/imagenes/thebirds.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '6',
          name: 'LIVERFULL',
          logoUrl: 'https://ligacubb.com/imagenes/liverfull.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '10',
          name: 'ULTRA CUEVA FC',
          logoUrl: 'https://ligacubb.com/imagenes/ultracuevafc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '7',
          name: 'REPO P.A.',
          logoUrl: 'https://ligacubb.com/imagenes/repopa.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '11',
          name: 'LA BIGORNIA FC',
          logoUrl: 'https://ligacubb.com/imagenes/labigorniafc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '8',
          name: 'BAFANGULO',
          logoUrl: 'https://ligacubb.com/imagenes/bafangulo.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '12',
          name: 'FONDO BLANCO',
          logoUrl: 'https://ligacubb.com/imagenes/fondoblanco.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
    ],
  },
  {
    id: 13,
    title: 'Fecha 13',
    partidos: [
      {
        equipoLocal: {
          id: '1',
          name: 'SIN CONTRATO',
          logoUrl: 'https://ligacubb.com/imagenes/sincontrato.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '14',
          name: 'CUALQUIER FRUTA Y/O VERDURA',
          logoUrl: 'https://ligacubb.com/imagenes/cualquierfrutayoverdura.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '2',
          name: 'RITMO Y SUSTANCIA',
          logoUrl: 'https://ligacubb.com/imagenes/ritmoysustancia.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '13',
          name: 'MANDIYU´S REVENGE',
          logoUrl: 'https://ligacubb.com/imagenes/mandiyusrevenge.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '3',
          name: 'FUERTE AL MEDIO',
          logoUrl: 'https://ligacubb.com/imagenes/fuertealmedio.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '16',
          name: 'FERNETBACHE',
          logoUrl: 'https://ligacubb.com/imagenes/fernetbache.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '4',
          name: 'SUPERGEDIENTOS',
          logoUrl: 'https://ligacubb.com/imagenes/supergedientos.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '15',
          name: 'INQUI FC',
          logoUrl: 'https://ligacubb.com/imagenes/inquifc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '5',
          name: 'ANTIDEPORTIVO CACACIOLI',
          logoUrl: 'https://ligacubb.com/imagenes/antideportivocacacioli.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '10',
          name: 'ULTRA CUEVA FC',
          logoUrl: 'https://ligacubb.com/imagenes/ultracuevafc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '6',
          name: 'LIVERFULL',
          logoUrl: 'https://ligacubb.com/imagenes/liverfull.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '9',
          name: 'THE BIRDS',
          logoUrl: 'https://ligacubb.com/imagenes/thebirds.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '7',
          name: 'REPO P.A.',
          logoUrl: 'https://ligacubb.com/imagenes/repopa.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '12',
          name: 'FONDO BLANCO',
          logoUrl: 'https://ligacubb.com/imagenes/fondoblanco.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '8',
          name: 'BAFANGULO',
          logoUrl: 'https://ligacubb.com/imagenes/bafangulo.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '11',
          name: 'LA BIGORNIA FC',
          logoUrl: 'https://ligacubb.com/imagenes/labigorniafc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
    ],
  },
  {
    id: 14,
    title: 'Fecha 14',
    partidos: [
      {
        equipoLocal: {
          id: '1',
          name: 'SIN CONTRATO',
          logoUrl: 'https://ligacubb.com/imagenes/sincontrato.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '15',
          name: 'INQUI FC',
          logoUrl: 'https://ligacubb.com/imagenes/inquifc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '2',
          name: 'RITMO Y SUSTANCIA',
          logoUrl: 'https://ligacubb.com/imagenes/ritmoysustancia.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '16',
          name: 'FERNETBACHE',
          logoUrl: 'https://ligacubb.com/imagenes/fernetbache.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '3',
          name: 'FUERTE AL MEDIO',
          logoUrl: 'https://ligacubb.com/imagenes/fuertealmedio.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '13',
          name: 'MANDIYU´S REVENGE',
          logoUrl: 'https://ligacubb.com/imagenes/mandiyusrevenge.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '4',
          name: 'SUPERGEDIENTOS',
          logoUrl: 'https://ligacubb.com/imagenes/supergedientos.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '14',
          name: 'CUALQUIER FRUTA Y/O VERDURA',
          logoUrl: 'https://ligacubb.com/imagenes/cualquierfrutayoverdura.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '5',
          name: 'ANTIDEPORTIVO CACACIOLI',
          logoUrl: 'https://ligacubb.com/imagenes/antideportivocacacioli.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '11',
          name: 'LA BIGORNIA FC',
          logoUrl: 'https://ligacubb.com/imagenes/labigorniafc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '6',
          name: 'LIVERFULL',
          logoUrl: 'https://ligacubb.com/imagenes/liverfull.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '12',
          name: 'FONDO BLANCO',
          logoUrl: 'https://ligacubb.com/imagenes/fondoblanco.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '7',
          name: 'REPO P.A.',
          logoUrl: 'https://ligacubb.com/imagenes/repopa.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '9',
          name: 'THE BIRDS',
          logoUrl: 'https://ligacubb.com/imagenes/thebirds.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '8',
          name: 'BAFANGULO',
          logoUrl: 'https://ligacubb.com/imagenes/bafangulo.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '10',
          name: 'ULTRA CUEVA FC',
          logoUrl: 'https://ligacubb.com/imagenes/ultracuevafc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
    ],
  },
  {
    id: 15,
    title: 'Fecha 15',
    partidos: [
      {
        equipoLocal: {
          id: '1',
          name: 'SIN CONTRATO',
          logoUrl: 'https://ligacubb.com/imagenes/sincontrato.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '16',
          name: 'FERNETBACHE',
          logoUrl: 'https://ligacubb.com/imagenes/fernetbache.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '2',
          name: 'RITMO Y SUSTANCIA',
          logoUrl: 'https://ligacubb.com/imagenes/ritmoysustancia.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '15',
          name: 'INQUI FC',
          logoUrl: 'https://ligacubb.com/imagenes/inquifc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '3',
          name: 'FUERTE AL MEDIO',
          logoUrl: 'https://ligacubb.com/imagenes/fuertealmedio.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '14',
          name: 'CUALQUIER FRUTA Y/O VERDURA',
          logoUrl: 'https://ligacubb.com/imagenes/cualquierfrutayoverdura.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '4',
          name: 'SUPERGEDIENTOS',
          logoUrl: 'https://ligacubb.com/imagenes/supergedientos.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '13',
          name: 'MANDIYU´S REVENGE',
          logoUrl: 'https://ligacubb.com/imagenes/mandiyusrevenge.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '5',
          name: 'ANTIDEPORTIVO CACACIOLI',
          logoUrl: 'https://ligacubb.com/imagenes/antideportivocacacioli.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '12',
          name: 'FONDO BLANCO',
          logoUrl: 'https://ligacubb.com/imagenes/fondoblanco.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '6',
          name: 'LIVERFULL',
          logoUrl: 'https://ligacubb.com/imagenes/liverfull.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '11',
          name: 'LA BIGORNIA FC',
          logoUrl: 'https://ligacubb.com/imagenes/labigorniafc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '7',
          name: 'REPO P.A.',
          logoUrl: 'https://ligacubb.com/imagenes/repopa.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '10',
          name: 'ULTRA CUEVA FC',
          logoUrl: 'https://ligacubb.com/imagenes/ultracuevafc.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
      {
        equipoLocal: {
          id: '8',
          name: 'BAFANGULO',
          logoUrl: 'https://ligacubb.com/imagenes/bafangulo.png',
          gender: GeneroEnum.MASCULINO,
        },
        equipoVisitante: {
          id: '9',
          name: 'THE BIRDS',
          logoUrl: 'https://ligacubb.com/imagenes/thebirds.png',
          gender: GeneroEnum.MASCULINO,
        },
      },
    ],
  },
];
