"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrestacaoServicoModel = void 0;
const db_js_1 = __importDefault(require("../servidor-local/src/lib/db.js"));
const uuid_generate_js_1 = __importDefault(require("../servidor-local/src/utils/uuid_generate.js"));
exports.PrestacaoServicoModel = {
    async create(prestacaoServico) {
        try {
            const [rows] = await db_js_1.default.execute(`INSERT INTO table_prestacao_servico 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                (0, uuid_generate_js_1.default)(),
                prestacaoServico.designacao,
                prestacaoServico.subtotal,
                prestacaoServico.horas_estimadas,
                prestacaoServico.id_prestador,
                prestacaoServico.id_servico,
                prestacaoServico.preco_hora,
                prestacaoServico.estado,
                prestacaoServico.id_orcamento,
                prestacaoServico.enabled,
                prestacaoServico.id_utilizador,
                prestacaoServico.urgente,
                new Date(),
                new Date()
            ]);
            console.log({ rows });
            return rows;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    },
    async getAll() {
        const [rows] = await db_js_1.default.execute("SELECT * FROM table_prestacao_servico");
        return rows;
    },
    async get(id) {
        try {
            const [rows] = await db_js_1.default.execute(`SELECT * FROM table_prestacao_servico 
                WHERE table_prestacao_servico.id = ?`, [id]);
            if (Array.isArray(rows) && rows.length === 0)
                return null;
            return Array.isArray(rows) ? rows[0] : null;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    },
    async update(id, prestacaoServico) {
        try {
            const [rows] = await db_js_1.default.execute(`UPDATE table_prestacao_servico 
                SET designacao = ?, 
                subtotal = ?, 
                horas_estimadas = ?, 
                id_prestador = ?, 
                id_servico = ?, 
                preco_hora = ?, 
                estado = ?, 
                id_orcamento = ?, 
                enabled = ?, 
                updated_at = ?
                WHERE id = ?`, [
                prestacaoServico.designacao,
                prestacaoServico.subtotal,
                prestacaoServico.horas_estimadas,
                prestacaoServico.id_prestador,
                prestacaoServico.id_servico,
                prestacaoServico.preco_hora,
                prestacaoServico.estado,
                prestacaoServico.id_orcamento,
                prestacaoServico.enabled,
                new Date(),
                id
            ]);
            console.log({ rows });
            return rows;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    },
    async delete(id) {
        try {
            const rows = await db_js_1.default.execute(`DELETE FROM table_prestacao_servico 
                WHERE id = ?`, [id]);
            return rows[0].affectedRows === 0 ? null : rows[0];
        }
        catch (err) {
            console.log(err);
            return null;
        }
    },
    async getByIdOrcamento(idOrcamento) {
        try {
            const [rows] = await db_js_1.default.execute(`SELECT * FROM table_prestacao_servico 
                WHERE table_prestacao_servico.id_orcamento = ?`, [idOrcamento]);
            if (Array.isArray(rows) && rows.length === 0)
                return null;
            return Array.isArray(rows) ? rows[0] : null;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    },
    async getAllPrestacaoServicoDetalhada(limit, offset) {
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
                FROM table_prestacao_servico ps
                INNER JOIN table_utlizadores u ON ps.id_utilizadores = u.id
                INNER JOIN table_servicos s ON ps.id_servico = s.id
                ORDER BY ps.created_at DESC
                LIMIT ? OFFSET ?
            `;
            const [rows] = await db_js_1.default.execute(query, [
                limit.toString(),
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
    async getAllPrestacaoServicoByCategoria(limit, offset, categoria) {
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
                FROM table_prestacao_servico ps
                INNER JOIN table_servicos s ON ps.id_servico = s.id
                INNER JOIN table_categoria c ON s.id_categoria = c.id
                ORDER BY ps.created_at DESC
                LIMIT ? OFFSET ?
                WHERE cd.id = ?
            `;
            const [rows] = await db_js_1.default.execute(query, [
                limit.toString(),
                offset.toString(),
                categoria
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
};
//# sourceMappingURL=prestacao_servico.model.js.map