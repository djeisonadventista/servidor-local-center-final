import type { PrestacaoServicoByCategoriaType, PrestacaoServicoDBType, PrestacaoServicoDetalhadoType } from "../servidor-local/src/utils/types.js";
export declare const PrestacaoServicoModel: {
    create(newPrestacaoServico: PrestacaoServicoDBType): Promise<PrestacaoServicoDBType | null>;
    getAll(): Promise<PrestacaoServicoDBType[] | null>;
    get(id: string): Promise<PrestacaoServicoDBType | null>;
    update(id: string, updatedPrestacaoServico: PrestacaoServicoDBType): Promise<PrestacaoServicoDBType | null>;
    delete(id: string): Promise<PrestacaoServicoDBType | null>;
    getByIdOrcamento(idOrcamento: string): Promise<PrestacaoServicoDBType | null>;
    getAllPrestacaoServicoDetalhada(limits: number, offset: number): Promise<PrestacaoServicoDetalhadoType[] | null>;
    getAllPrestacaoServicoByCategoriaDetalhado(limit: number, offset: number, idcategoria: string): Promise<PrestacaoServicoByCategoriaType[] | null>;
};
//# sourceMappingURL=prestacao.servico.model.d.ts.map