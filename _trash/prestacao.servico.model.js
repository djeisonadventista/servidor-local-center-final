"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrestacaoServicoModel = void 0;
const node_http_1 = require("node:http");
const db_js_1 = __importDefault(require("../servidor-local/src/lib/db.js"));
exports.PrestacaoServicoModel = {
    async create(newPrestacaoServico) {
        try {
            const query = `INSERT INTO tabela_prestacao_servicos VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [
                null,
                newPrestacaoServico.designacao,
                newPrestacaoServico.subtotal,
                newPrestacaoServico.horas_estimadas,
                newPrestacaoServico.id_prestador,
                newPrestacaoServico.id_servico,
                newPrestacaoServico.preco_hora,
                newPrestacaoServico.estado,
                newPrestacaoServico.id_orcamento,
                newPrestacaoServico.enabled,
                new Date(),
                new Date(),
            ];
            const [rows] = await db_js_1.default.execute(query, values);
            return rows;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    },
    async getAll() {
        try {
            const query = `SELECT * FROM tabela_prestacao_servicos`;
            const [rows] = await db_js_1.default.execute(query);
            return Array.isArray(rows) ? rows : [];
        }
        catch (error) {
            console.log(error);
            return null;
        }
    },
    async get(id) {
        try {
            const query = `SELECT * FROM tabela_prestacao_servicos WHERE id = ?`;
            const value = [id];
            const [rows] = await db_js_1.default.execute(query, value);
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    },
    async update(id, updatedPrestacaoServico) {
        try {
            const query = `UPDATE tabela_prestacao_servicos 
                        SET 
                            designacao=?,
                            subtotal=?,
                            horas_estimadas=?,
                            id_prestador=?,
                            id_servico=?,
                            preco_hora=?,
                            estado=?,
                            id_orcamento=?,
                            enabled=?,
                            updated_at=?
                        WHERE
                            id=?
                        ;`;
            const values = [
                updatedPrestacaoServico.designacao,
                updatedPrestacaoServico.subtotal,
                updatedPrestacaoServico.horas_estimadas,
                updatedPrestacaoServico.id_prestador,
                updatedPrestacaoServico.id_servico,
                updatedPrestacaoServico.preco_hora,
                updatedPrestacaoServico.estado,
                updatedPrestacaoServico.id_orcamento,
                updatedPrestacaoServico.enabled,
                new Date(),
                id,
            ];
            const [rows] = await db_js_1.default.execute(query, values);
            return rows;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    },
    async delete(id) {
        try {
            const query = `DELETE FROM tabela_prestacao_servicos WHERE id = ?`;
            const value = [id];
            const [rows] = await db_js_1.default.execute(query, value);
            return rows?.affectedRows === 0 ? null : rows;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    },
    async getByIdOrcamento(idOrcamento) {
        try {
            const [rows] = await db_js_1.default.execute(`SELECT * 
            FROM tabela_prestacao_servicos WHERE id_orcamento = ?`, [idOrcamento]);
            if (Array.isArray(rows) && rows.length > 0)
                return null;
            return Array.isArray(rows) ? rows[0] : null;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    },
    async getAllPrestacaoServicoDetalhada(limits, offset) {
        try {
            const query = `
                SELECT
                    ps.id as id_prestacao_servico,
                    ps.designacao as descricao,
                    u.nome as nome_utilizador,
                    u.email as email_utilizador,
                    s.nome as nome_servico,
                    ps.created_at as data_pedido,
                    ps.urgente
                    FROM tabela_prrestacao_servico ps
                    INNER JOIN tabela_utilizadores u ON ps.id_utilizador = u.id
                    INNER JOIN tabela_servicos s ON ps.id_servico = s.id
                    ORDER BY ps.created_at DESC
                    LIMIT ? OFFSET ?
            `;
            const [rows] = await db_js_1.default.execute(query, [
                limits.toString(),
                offset.toString()
            ]);
            if (Array.isArray(rows) && rows.length === 0)
                return null;
            return Array.isArray(rows) ? rows : null;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    },
    async getAllPrestacaoServicoByCategoriaDetalhado(limit, offset, idcategoria) {
        try {
            const query = `
            SELECT DISTINCT
               ps.id as id_prestacao_servico,
               ps.designacao as nome_servico,
               s.nome as nome_servico,
               c.designacao as designacao_categoria,
               c.icone as icone_categoria,
               e.designacao as designacao_empresa,
               s.enabled

               FROM tbl_prestacao_servicos ps
               INNER JOIN tbl_categorias c ON c.id = s.id_categoria AND c.id = ?
               INNER JOIN tbl_servico s ON ps.id_servico = s.id
               ORDER BY ps.created_at DESC
               LIMIT ? OFFSET ?
            `;
            const value = [
                limit.toString(),
                offset.toString()
            ];
            const [rows] = await db_js_1.default.execute(query, value);
            console.log("rows", rows);
            console.log("value", value);
            console.log("limit", limit, offset);
            if (Array.isArray(rows) && rows.length === 0)
                return [];
            return Array.isArray(rows) ? rows : [];
        }
        catch (err) {
            console.log(err);
            return null;
        }
    },
};
//# sourceMappingURL=prestacao.servico.model.js.map